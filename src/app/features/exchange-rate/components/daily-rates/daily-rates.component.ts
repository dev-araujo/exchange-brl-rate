import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyExchangeRate } from '../../models/exchange-rate.model';
import { CommonModule } from '@angular/common';
import { RateChangeArrowPipe } from '../../../../shared/pipes/rate-change-arrow.pipe';
import { MinusPlusSymbolPipe } from '../../../../shared/pipes/minus-plus-symbol.pipe';

const PIPES = [RateChangeArrowPipe, MinusPlusSymbolPipe ]

@Component({
  selector: 'app-daily-rates',
  standalone: true,
  imports: [CommonModule, ...PIPES], 
  template: `
@if (dailyRates.length > 0) {
  @for (rate of dailyRates; track rate.date) {
  <div class="day-card">
    <div class="day-card__header">{{ rate.date | date : "dd/MM/yyyy" }}</div>
    <div class="day-card__values">
      <div>
        <span>OPEN:</span>
        <b>{{ rate.open | currency : "BRL" : "symbol" : "1.4-4" }}</b>
      </div>
      <div>
        <span>HIGH:</span>
        <b>{{ rate.high | currency : "BRL" : "symbol" : "1.4-4" }}</b>
      </div>
      <div>
        <span class="day-card__margin-close">CLOSE:</span>
        <b>{{ rate.close | currency : "BRL" : "symbol" : "1.4-4" }}</b>
      </div>
      <div>
        <span class="day-card__low-margin">LOW:</span>
        <b>{{ rate.low | currency : "BRL" : "symbol" : "1.4-4" }}</b>
      </div>
      @if(rate['diff'] !== undefined) {
      <div
        class="day-card__close-diff"
        [ngClass]="{
          'day-card__close-diff--positive': rate['diff'] > 0,
          'day-card__close-diff--negative': rate['diff'] < 0
        }"
      >
        <span>CLOSE DIFF (%):</span>
        <div class="day-card__diff-value">
          {{ rate["diff"] | minusPlusSymbol }}
          {{ rate["diff"] | number : "1.2-2" }} %
          <img
            class="day-card__rate-arrow-icon"
            [src]="rate['diff'] | rateChangeArrow"
            alt="Indicador de variação da cotação"
          />
        </div>
      </div>
      }
    </div>
  </div>
  }
}`,
  styleUrl: './daily-rates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyRatesComponent {
  @Input() dailyRates: DailyExchangeRate[] = [];
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRate } from '../../models/exchange-rate.model';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { MoreLessPipe } from '../../../../shared/pipes/more-less.pipe';

const PIPES = [CurrencyPipe, DatePipe, UpperCasePipe, MoreLessPipe];

@Component({
  selector: 'app-exchange-rate-result',
  imports: [CommonModule, ...PIPES],
  template: `@if (exchangeRate) {
    <div class="card result">
      <div class="result__header">
        <article class="result__header-sub">
          Exchange rate now
          
          <p class="result__date">{{
            exchangeRate.lastUpdatedAt | date : 'dd/MM/yyyy - HH:mm'
          }}
          </p>
        </article>

        <span class="result__currency-pair"
          >{{ exchangeRate.fromSymbol | uppercase }}/{{
            exchangeRate.toSymbol | uppercase
          }}</span
        >
      </div>
      <div class="result__value">
        <h2>
          {{
            exchangeRate.exchangeRate | currency : 'BRL' : 'symbol' : '1.4-4'
          }}
        </h2>
      </div>
     <div class="result__last-30-days" (click)="onToggleDailyRates()">
        <span>LAST 30 DAYS</span>
        <img class="result__toggle-details" [src]="showDaily | moreLess" alt="Toggle Details Icon">
      </div>
    </div>
    }`,
  styleUrls: ['./exchange-rate-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeRateResultComponent {
  @Input() exchangeRate: ExchangeRate | null = null;
  @Input() showDaily = false;
  @Output() toggleDailyRates = new EventEmitter<void>();

  onToggleDailyRates(): void {
    this.toggleDailyRates.emit();
  }
}

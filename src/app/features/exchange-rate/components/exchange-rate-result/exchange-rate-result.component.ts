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

const PIPES = [CurrencyPipe, DatePipe, UpperCasePipe];

@Component({
  selector: 'app-exchange-rate-result',
  imports: [CommonModule, ...PIPES],
  template: `@if (exchangeRate) {
    <div class="card result">
      <div class="result-header">
        <article class="result-header-sub">
          Exchange rate now
          
          <p class="date">{{
            exchangeRate.lastUpdatedAt | date : 'dd/MM/yyyy - HH:mm'
          }}
          </p>
        </article>

        <span class="currency-pair"
          >{{ exchangeRate.fromSymbol | uppercase }}/{{
            exchangeRate.toSymbol | uppercase
          }}</span
        >
      </div>
      <div class="result-value">
        <h2>
          {{
            exchangeRate.exchangeRate | currency : 'BRL' : 'symbol' : '1.4-4'
          }}
        </h2>
      </div>
      <div class="last-30-days" (click)="onToggleDailyRates()">
        <span>LAST 30 DAYS</span>
        <span class="toggle-icon">{{ showDaily ? '-' : '+' }}</span>
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

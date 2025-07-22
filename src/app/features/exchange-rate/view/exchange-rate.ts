import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DailyExchangeRate,
  ExchangeRate,
} from '../models/exchange-rate.model';
import { RateChangeArrowPipe } from '../../../shared/pipes/rate-change-arrow.pipe';
import { ExchangeRateService } from '../services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    RateChangeArrowPipe, 
  ],
  templateUrl: './exchange-rate.html',
  styleUrls: ['./exchange-rate.scss'],
})
export class ExchangeRateComponent {
  currencyCode = signal('USD');
  exchangeRate = signal<ExchangeRate | null>(null);
  dailyRates = signal<DailyExchangeRate[]>([]);
  showDaily = signal(false);
  private readonly TO_SYMBOL_DEFAULT = 'BRL'

  private exchangeRateService: ExchangeRateService = inject(ExchangeRateService)

  getExchangeRate(): void {
    this.exchangeRateService
      .getCurrentExchangeRate(this.currencyCode(), this.TO_SYMBOL_DEFAULT)
      .subscribe((data) => {
        this.exchangeRate.set(data);
        this.showDaily.set(false);
        this.dailyRates.set([]);
      });
  }

  getDailyRates(): void {
    if (this.dailyRates().length > 0) {
      this.showDaily.set(!this.showDaily());
      return;
    }

    this.exchangeRateService
      .getDailyExchangeRate(this.currencyCode(), this.TO_SYMBOL_DEFAULT)
      .subscribe((processedRates) => {
        this.dailyRates.set(processedRates);
        this.showDaily.set(true);
      });
  }
}
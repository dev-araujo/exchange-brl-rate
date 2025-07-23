import { Component, inject, signal } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyExchangeRate, ExchangeRate } from '../models/exchange-rate.model';
import { RateChangeArrowPipe } from '../../../shared/pipes/rate-change-arrow.pipe';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExchangeRateResultComponent } from '../components/exchange-rate-result/exchange-rate-result.component';
import { DailyRatesComponent } from '../components/daily-rates/daily-rates.component';

const MATERIAL_DESIGN = [MatFormFieldModule, MatInputModule];
const COMPONENTS = [ExchangeRateResultComponent, DailyRatesComponent];

@Component({
  selector: 'app-exchange-rate-list',
  imports: [CommonModule, FormsModule, ...MATERIAL_DESIGN, ...COMPONENTS],
  templateUrl: './exchange-rate.html',
  styleUrls: ['./exchange-rate.scss'],
})
export class ExchangeRateComponent {
  currencyCode = signal('');
  exchangeRate = signal<ExchangeRate | null>(null);
  dailyRates = signal<DailyExchangeRate[]>([]);
  showDaily = signal(false);
  private readonly TO_SYMBOL_DEFAULT = 'BRL';

  private exchangeRateService: ExchangeRateService =
    inject(ExchangeRateService);

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

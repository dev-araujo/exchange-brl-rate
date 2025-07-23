import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';
import {
  DailyExchangeRate,
  DailyExchangeRateResponse,
  ExchangeRate,
} from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiService: ApiService = inject(ApiService);
  private readonly _API_URL = environment.API_URL
  private readonly _CURRENT_EXCHANGE_RATE_ENDPOINT = `${this._API_URL}/currentExchangeRate`;
  private readonly _CURRENT_DAILY_EXCHANGE_RATE_ENDPOINT = `${this._API_URL}/dailyExchangeRate`;


  getCurrentExchangeRate(
    fromSymbol: string,
    toSymbol: string
  ): Observable<ExchangeRate> {
    const endpoint = `${this._CURRENT_EXCHANGE_RATE_ENDPOINT}`;
    const params = this._createAuthParams(fromSymbol, toSymbol);

    return this.apiService.get<ExchangeRate>(endpoint, params);
  }

  getDailyExchangeRate(
    fromSymbol: string,
    toSymbol: string
  ): Observable<DailyExchangeRate[]> {
    const endpoint = `${this._CURRENT_DAILY_EXCHANGE_RATE_ENDPOINT}`;
    const params = this._createAuthParams(fromSymbol, toSymbol);

    return this.apiService
      .get<DailyExchangeRateResponse>(endpoint, params)
      .pipe(map((response) => this._processDailyRates(response.data || [])));
  }

  private _createAuthParams(fromSymbol: string, toSymbol: string): HttpParams {
    return new HttpParams()
      .set('apiKey', environment.API_KEY)
      .set('from_symbol', fromSymbol)
      .set('to_symbol', toSymbol);
  }

   private _processDailyRates(rates: DailyExchangeRate[]): DailyExchangeRate[] {
    rates.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (let i = 0; i < rates.length - 1; i++) {
      const today = rates[i];
      const yesterday = rates[i + 1];
      today['diff'] =
        ((today.close - yesterday.close) / yesterday.close) * 100;
    }

    return rates;
  }
}

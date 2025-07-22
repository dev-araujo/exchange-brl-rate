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
  private readonly API_URL = environment.API_URL
  private readonly CURRENT_EXCHANGE_RATE_ENDPOINT = `${this.API_URL}/currentExchangeRate`;
  private readonly CURRENT_DAILY_EXCHANGE_RATE_ENDPOINT = `${this.API_URL}/dailyExchangeRate`;


  getCurrentExchangeRate(
    fromSymbol: string,
    toSymbol: string
  ): Observable<ExchangeRate> {
    const endpoint = `${this.CURRENT_EXCHANGE_RATE_ENDPOINT}`;
    const params = this.createAuthParams(fromSymbol, toSymbol);

    return this.apiService.get<ExchangeRate>(endpoint, params);
  }

  getDailyExchangeRate(
    fromSymbol: string,
    toSymbol: string
  ): Observable<DailyExchangeRate[]> {
    const endpoint = `${this.CURRENT_DAILY_EXCHANGE_RATE_ENDPOINT}`;
    const params = this.createAuthParams(fromSymbol, toSymbol);

    return this.apiService
      .get<DailyExchangeRateResponse>(endpoint, params)
      .pipe(map((response) => response.data || []));
  }

  private createAuthParams(fromSymbol: string, toSymbol: string): HttpParams {
    return new HttpParams()
      .set('apiKey', environment.API_KEY)
      .set('from_symbol', fromSymbol)
      .set('to_symbol', toSymbol);
  }
}

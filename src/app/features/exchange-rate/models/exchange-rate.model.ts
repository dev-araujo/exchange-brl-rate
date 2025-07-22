export interface ExchangeRate {
  success: boolean;
  lastUpdatedAt: string;
  fromSymbol: string;
  toSymbol: string;
  exchangeRate: number;
}

export interface DailyExchangeRate {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
  diff?: number;
}

export interface DailyExchangeRateResponse {
  success: boolean;
  from: string;
  to: string;
  lastUpdatedAt: string;
  data: DailyExchangeRate[];
}
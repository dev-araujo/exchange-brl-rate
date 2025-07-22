import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  post<T>(
    url: string,
    body: object,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http.post<T>(url, body, { params });
  }
}

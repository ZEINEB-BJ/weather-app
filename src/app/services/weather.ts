import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '4af3644fde6cbaed7ed6090e904013c3';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`
    );
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`
    );
  }
}

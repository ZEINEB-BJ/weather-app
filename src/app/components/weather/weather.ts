import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.css'],
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  forecastData: any;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.city) return;

    this.loading = true;
    this.errorMsg = '';
    this.weatherData = null;
    this.forecastData = null;

    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMsg = '⚠️ Ville introuvable';
      },
    });

    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => (this.forecastData = data),
    });
  }

  getIconUrl(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getDailyForecast() {
    if (!this.forecastData) return [];
    const daily = this.forecastData.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
    return daily;
  }

  getBackgroundColor() {
    if (!this.weatherData) return 'white';
    const main = this.weatherData.weather[0].main.toLowerCase();
    switch (main) {
      case 'clear':
        return '#f7dc6f';
      case 'clouds':
        return '#d6dbdf';
      case 'rain':
      case 'drizzle':
        return '#85c1e9';
      case 'thunderstorm':
        return '#5dade2';
      case 'snow':
        return '#ffffff';
      case 'mist':
      case 'fog':
        return '#aeb6bf';
      default:
        return 'white';
    }
  }

  getForecastColor(item: any) {
    const main = item.weather[0].main.toLowerCase();
    switch (main) {
      case 'clear':
        return '#f7dc6f';
      case 'clouds':
        return '#d6dbdf';
      case 'rain':
      case 'drizzle':
        return '#85c1e9';
      case 'thunderstorm':
        return '#5dade2';
      case 'snow':
        return '#ffffff';
      case 'mist':
      case 'fog':
        return '#aeb6bf';
      default:
        return 'white';
    }
  }
}

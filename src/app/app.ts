import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from './components/weather/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, WeatherComponent],
  template: '<app-weather></app-weather>',
})
export class App {
  protected readonly title = signal('weather-app');
}

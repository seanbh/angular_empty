import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateInputDemoComponent } from './date-input-demo/date-input-demo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DateInputDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Empty - Verified';
}

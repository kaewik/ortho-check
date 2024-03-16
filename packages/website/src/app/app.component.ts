import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CheckFormComponent } from './check-form/check-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckFormComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Ortho Check';
}

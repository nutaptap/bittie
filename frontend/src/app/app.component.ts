import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
  <app-header />
  <h1>Potato</h1>
  <router-outlet />
  <app-footer>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}

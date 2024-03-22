import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
  <main>
   <h1>Home</h1>
  </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

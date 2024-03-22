import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
  <main>
   <h1>Log in</h1>
  </main>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

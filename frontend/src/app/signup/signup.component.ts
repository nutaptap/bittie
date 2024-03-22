import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
  <main>
   <h1>Sign up</h1>
  </main>
  `,
  styleUrl: './signup.component.css',
})
export class SignupComponent {}

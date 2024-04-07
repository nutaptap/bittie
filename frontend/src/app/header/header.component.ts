import { Component, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() loggedIn = false;
  @Input() photoURL: string | undefined;

  constructor(public router: Router) {}

  navigate(destination: string) {
    this.router.navigate(['/login', { destination: destination }]);
  }
}

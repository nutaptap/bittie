import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, LogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() loggedIn = false;
  @Input() photoURL: string | undefined;
  logoutModal = true;

  constructor(public router: Router) {}

  handleModal() {
    this.logoutModal = !this.logoutModal;
  }

  navigate(destination: string) {
    this.router.navigate(['/login', { destination: destination }]);
  }

  @Output() logoutEvent = new EventEmitter<void>();

  handleLogout(event: void) {
    console.log('Header: User logged out');
    this.logoutEvent.emit();
  }

  handleModalEvent(event: void) {
    this.handleModal();
  }
}

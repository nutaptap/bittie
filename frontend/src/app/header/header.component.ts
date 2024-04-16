import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
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
  logoutModal = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    console.log(this.photoURL);
  }

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

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const container = document.querySelector('.container');
    if (container && !container.contains(event.target as Node)) {
      this.handleModal();
    }
  }
}

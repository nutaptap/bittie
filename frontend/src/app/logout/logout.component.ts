import { Component, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  logout() {
    this.logoutEvent.emit();
  }
}

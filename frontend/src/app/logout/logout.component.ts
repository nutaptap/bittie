import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  @Output() logoutEvent = new EventEmitter<void>();
  /* @Output() modalEvent = new EventEmitter<void>(); */

  constructor(private elementRef: ElementRef) {}

  logout() {
    this.logoutEvent.emit();
  }

  /* modal() {
    this.modalEvent.emit();
  } */

  /* @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.modal();
    }
  } */
}

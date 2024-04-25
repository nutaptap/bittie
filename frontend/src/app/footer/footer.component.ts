import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactComponent],
  template: `
    <footer>
      <button class="contact" (click)="openModal()">
        <svg
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="-5.0 -10.0 110.0 135.0"
        >
          <path
            fill="currentColor"
            d="m78.125 18.75h-56.25c-8.6133 0-15.625 7.0117-15.625 15.625v31.25c0 1.875 0.38672 3.6484 0.99219 5.3125 0.011718 0.050781 0.03125 0.09375 0.046874 0.14453 2.2227 5.9219 7.8984 10.168 14.586 10.168h56.25c6.6875 0 12.363-4.2461 14.586-10.168 0.015624-0.050781 0.035156-0.09375 0.046874-0.14453 0.60547-1.668 0.99219-3.4414 0.99219-5.3125v-31.25c0-8.6133-7.0117-15.625-15.625-15.625zm9.375 45.957-22.754-16.918 18.973-20.891c2.2812 1.7109 3.7812 4.4102 3.7812 7.4766zm-64.496-39.707h53.996l-26.996 29.73zm-6.7227 1.8945 18.961 20.875-22.742 16.934v-30.328c0-3.0664 1.5-5.7656 3.7812-7.4805zm61.844 48.105h-56.25c-3.1055 0-5.8398-1.5352-7.5469-3.8672l25.137-18.715 8.2227 9.0547c0.58984 0.65625 1.4297 1.0273 2.3125 1.0273 0.87891 0 1.7188-0.37109 2.3125-1.0195l8.2109-9.0391 25.148 18.695c-1.707 2.3281-4.4414 3.8633-7.5469 3.8633z"
          />
        </svg>
        <span>contact</span>
      </button>
      <span class="nuria"> Coded with <span>♥️</span> by Nuria </span>
      @if(this.contactModal) {
      <div class="modal-backdrop" (click)="handleModal()">
        <app-contact />
      </div>
      }
    </footer>
  `,
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  contactModal = false;

  openModal(event: void) {
    this.contactModal = true;
  }

  handleModal(event: void) {
    console.log('modal');
    if (this.contactModal) {
      this.contactModal = !this.contactModal;
    }
  }
}

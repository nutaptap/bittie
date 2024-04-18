import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-url',
  standalone: true,
  imports: [],
  templateUrl: './edit-url.component.html',
  styleUrl: './edit-url.component.css',
})
export class EditUrlComponent {
  @Input() id: number | undefined = undefined;
  @Input() modal = false;
  @Output() modalEvent = new EventEmitter<void>();

  handleModalClick(event: Event) {
    event.stopPropagation();
  }
}

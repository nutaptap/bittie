import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-url',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EditUrlComponent],
  templateUrl: './edit-url.component.html',
  styleUrl: './edit-url.component.css',
})
export class EditUrlComponent implements OnInit {
  @Input() id: number | undefined = undefined;
  @Input() modal = false;
  @Output() modalEvent = new EventEmitter<void>();
  editForm = new FormGroup({
    destination: new FormControl('', Validators.required),
    custom: new FormControl(''),
  });
  data: any;
  filteredData: any;
  subscription: Subscription | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.subscription = this.http
      .get<any>('https://bittie-production.up.railway.app/')
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(data);
          this.filterUrl();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  filterUrl() {
    this.filteredData = this.data.filter((element: any) => {
      return element.id === this.id;
    });
    console.log(this.filteredData);
    this.editForm.patchValue({
      destination: this.filteredData[0].destination_url,
      custom: this.filteredData[0].custom_url || this.filteredData[0].id,
    });
  }

  handleModalClick(event: Event) {
    event.stopPropagation();
  }

  submitForm() {
    console.log('Form submitted');
    console.log('edit url form submitted');
    this.updateUserId();
  }

  handleRemoveButton() {
    console.log('Remove submitted');
    this.deleteUrl();
  }

  updateUserId() {
    const destinationUrl = this.editForm.get('destination')?.value;
    const customUrl = this.editForm.get('custom')?.value;
    this.http
      .patch(`https://bittie-production.up.railway.app/${this.id}`, {
        custom_url: customUrl,
        destination_url: destinationUrl,
      })
      .subscribe({
        next: (response) => {
          console.log('URL mapping updated:', response);
          location.reload();
        },
        error: (error) => {
          console.error('Error updating URL mapping:', error);
        },
      });
  }

  deleteUrl() {
    this.http
      .delete(`https://bittie-production.up.railway.app/${this.id}`)
      .subscribe({
        next: (response) => {
          console.log('URL mapping deleted:', response);
          location.reload();
        },
        error: (error) => {
          console.error('Error deleting URL mapping:', error);
        },
      });
  }
}

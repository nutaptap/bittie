import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data: any[] = [];
  private subscription: Subscription | undefined;
  formSubmitted = false;

  urlForm = new FormGroup({
    destination: new FormControl('', Validators.required),
    custom: new FormControl(''),
  });

  constructor(private httpClient: HttpClient) {}

  fetchData() {
    this.subscription = this.httpClient
      .get<any[]>('http://localhost:1238/')
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log('Data fetched:', this.data);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  submitForm() {
    if (this.urlForm.value.destination !== '') {
      console.log('Url created', this.urlForm.value.destination);
      this.fetchData();
      this.formSubmitted = true;
      return false;
    } else {
      console.log('Missing destination url');
      this.formSubmitted = true;
      return false;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

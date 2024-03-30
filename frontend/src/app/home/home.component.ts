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

  postData(destination: string, custom?: string) {
    const postData = {
      custom_url: custom || undefined,
      destination_url: destination,
    };
    this.subscription = this.httpClient
      .post('http://localhost:1238/', postData)
      .subscribe({
        next: (response: any) => {
          console.log('Post succesful: ', response.data);
          this.saveData(
            response.data.id,
            response.data.destination_url,
            response.data.custom_url || undefined
          );
        },
        error: (error) => {
          console.error('Error posing data: ', error);
        },
      });
  }

  saveData(id: number, destination: string, custom?: string) {
    const saveData = {
      id: id,
      custom_url: custom || undefined,
      destination_url: destination,
      saved_urls: true,
    };

    const saveDataString = JSON.stringify(saveData);

    localStorage.setItem(String(id), saveDataString);
  }

  submitForm() {
    if (this.urlForm.value.destination !== '') {
      console.log('Url created', this.urlForm.value.destination);
      this.formSubmitted = true;
      this.postData(
        this.urlForm.value.destination!,
        this.urlForm.value.custom || undefined
      );
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

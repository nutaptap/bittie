import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { EditUrlComponent } from '../edit-url/edit-url.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EditUrlComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data: any[] = [];
  filteredData: any[] = [];
  local: any[] = [];
  private subscription: Subscription | undefined;
  formSubmitted = false;
  urlForm = new FormGroup({
    destination: new FormControl('', Validators.required),
    custom: new FormControl(''),
  });
  selectedId: number | undefined = undefined;
  editModal = false;

  constructor(
    private httpClient: HttpClient,
    public userId: UserServiceService
  ) {}

  ngOnInit() {
    this.fetchLocalStorageData();
    this.fetchData();
  }

  copyData(data: any) {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        console.log('Data copied to clipboard:', data);
      })
      .catch((error) => {
        console.error('Unable to copy data to clipboard:', error);
      });
  }

  fetchLocalStorageData() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const dataString = localStorage.getItem(key);
        if (dataString) {
          const data = JSON.parse(dataString);
          this.local.push(data);

          if (this.userId.user()) {
            this.updateUserId(data.id, Number(this.userId.user()));
          }
        }
      }
    }
    console.log('Local data fetched:', this.local);
  }

  updateUserId(id: number, userId: number) {
    this.httpClient
      .patch(`http://localhost:1238/${id}`, { user_id: userId })
      .subscribe({
        next: (response) => {
          console.log('URL mapping updated:', response);

          this.removeFromLocalStorage(id);
        },
        error: (error) => {
          console.error('Error updating URL mapping:', error);
          console.log(userId);
        },
      });
  }

  removeFromLocalStorage(id: number) {
    localStorage.removeItem(String(id));
  }

  fetchData() {
    this.subscription = this.httpClient
      .get<any[]>('http://localhost:1238/')
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log('Data fetched:', this.data);

          const userId = Number(this.userId.user());
          if (userId) {
            this.filteredData = this.data.filter((item) => {
              console.log('user_id:', item.user_id, 'userId:', userId);
              return item.user_id === userId;
            });
          }

          console.log('Filtered data:', this.data);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  postData(destination: string, custom?: string) {
    const postData = {
      custom_url: custom ?? null,
      destination_url: destination,
      user_id: this.userId.user() ?? null,
    };
    this.subscription = this.httpClient
      .post('http://localhost:1238/', postData)
      .subscribe({
        next: (response: any) => {
          console.log('Post succesful: ', response.data);
          if (!this.userId.user()) {
            this.saveData(
              response.data.id,
              response.data.destination_url,
              response.data.custom_url || undefined
            );
          } else {
            this.fetchData();
          }
        },
        error: (error) => {
          console.error('Error posing data: ', error);
        },
      });
    this.urlForm.reset();
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
    this.local = [];
    this.fetchLocalStorageData();
  }

  submitForm() {
    if (this.urlForm.value.destination !== '') {
      console.log('Url created', this.urlForm.value.destination);
      this.formSubmitted = true;
      this.postData(
        this.urlForm.value.destination!,
        this.urlForm.value.custom || undefined
      );
    } else {
      console.log('Missing destination url');
      this.formSubmitted = true;
    }
  }

  handleClick(id: string) {
    this.selectedId = Number(id);
    this.editModal = !this.editModal;
  }

  handleModal(event: void) {
    if (this.editModal) {
      this.editModal = !this.editModal;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

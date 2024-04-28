import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { EditUrlComponent } from '../edit-url/edit-url.component';
import JSConfetti from 'js-confetti';

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
  customError = false;
  jsConfetti = new JSConfetti();

  constructor(
    private httpClient: HttpClient,
    public userId: UserServiceService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.fetchLocalStorageData();
  }

  copyData(custom_url: string | undefined, id: string) {
    navigator.clipboard
      .writeText('https://bittie.eu/' + (custom_url ? custom_url : id))
      .then(() => {
        console.log(
          'Data copied to clipboard:',
          'https://bittie.eu/' + (custom_url ? custom_url : id)
        );
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
  }

  updateUserId(id: number, userId: number) {
    this.httpClient
      .patch(`https://bittie-production.up.railway.app/${id}`, {
        user_id: userId,
      })
      .subscribe({
        next: (response) => {
          this.removeFromLocalStorage(id);
          location.reload();
        },
        error: (error) => {
          console.error('Error updating URL mapping:', error);
        },
      });
  }

  removeFromLocalStorage(id: number) {
    localStorage.removeItem(String(id));
  }

  fetchData() {
    this.subscription = this.httpClient
      .get<any[]>('https://bittie-production.up.railway.app/')
      .subscribe({
        next: (data) => {
          this.data = data;

          const userId = Number(this.userId.user());
          if (userId) {
            this.filteredData = this.data.filter((item) => {
              return item.user_id === userId;
            });
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  postData(destination: string, custom?: string) {
    const postData = {
      custom_url: custom ? custom.split(' ').join('') : null,
      destination_url: destination,
      user_id: this.userId.user() ?? null,
    };
    this.subscription = this.httpClient
      .post('https://bittie-production.up.railway.app/', postData)
      .subscribe({
        next: (response: any) => {
          this.customError = false;
          if (!this.userId.user()) {
            this.saveData(
              response.data.id,
              response.data.destination_url,
              response.data.custom_url || undefined
            );
          } else {
            this.fetchData();
          }
          this.jsConfetti.addConfetti({
            confettiColors: ['#a17ac5', '#ed7474ff', '#c6ccf7'],
          });
          this.urlForm.reset();
        },
        error: (error) => {
          if (
            error.error.error.includes(
              'duplicate key value violates unique constraint'
            )
          ) {
            console.log('Custom url already taken!');
            this.customError = true;
          }
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
    this.local = [];
    this.fetchLocalStorageData();
  }

  submitForm() {
    if (this.urlForm.value.destination !== '') {
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

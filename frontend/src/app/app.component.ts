import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  httpClient = inject(HttpClient);
  loading = true;
  data: any[] = [];
  currentUrl: string = '';
  customUrl: string | null = null;
  idUrl: string | null = null;

  constructor(private location: Location) {
    this.currentUrl = this.location.path().substring(1);
  }

  fetchData(): Observable<any> {
    return this.httpClient.get('http://localhost:1238/');
  }

  findCustom() {
    this.data.forEach((item) => {
      if (item.custom_url === this.currentUrl) {
        this.customUrl = item.destination_url;
      }
    });
  }

  findId() {
    this.data.forEach((item) => {
      if (String(item.id) === this.currentUrl) {
        this.customUrl = item.destination_url;
      }
    });
  }

  redirect() {
    if (this.customUrl) {
      window.location.href = this.customUrl;
    } else if (this.idUrl) {
      window.location.href = this.idUrl;
    } else {
      this.loading = false;
    }
  }

  ngOnInit(): void {
    this.fetchData().subscribe((data: any) => {
      this.data = data;
      this.findCustom();
      this.findId();
      this.redirect();
    });
  }
}

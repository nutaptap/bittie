import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css',
})
export class RouteComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: any[] = [];
  currentUrl: string = '';
  customUrl: string | null = null;
  idUrl: string | null = null;

  constructor(private router: Router) {
    this.currentUrl = this.router.url.substring(1);
  }

  fetchData(): Observable<any> {
    return this.httpClient.get('http://localhost:1238/');
  }

  findCustom() {
    console.log('Searching for matching custom url');

    this.data.forEach((item) => {
      if (item.custom_url === this.currentUrl) {
        console.log('Custom url match found: ', item.destination_url);
        this.customUrl = item.destination_url;
      }
    });

    console.log('Redirecting if found');
  }

  findId() {
    console.log('Searching for matching id url');

    this.data.forEach((item) => {
      if (String(item.id) === this.currentUrl) {
        console.log('Id url match found, ', item.destination_url);
        this.customUrl = item.destination_url;
      }
    });

    console.log('Redirecting if found');
  }

  redirect() {
    console.log('Redirecting user');
    if (this.customUrl) {
      window.location.href = this.customUrl;
    } else if (this.idUrl) {
      window.location.href = this.idUrl;
    } else {
      console.log('No matching url found');
    }
  }

  ngOnInit(): void {
    this.fetchData().subscribe((data: any) => {
      console.log(data);
      this.data = data;
      this.findCustom();
      this.findId();
      this.redirect();
    });
  }
}

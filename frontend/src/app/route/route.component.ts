import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css',
})
export class RouteComponent implements OnInit {
  currentUrl: string;
  constructor(private router: Router) {
    this.currentUrl = this.router.url.substring(1);
  }

  httpClient = inject(HttpClient);
  data: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('http://localhost:1238/').subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
  }
}

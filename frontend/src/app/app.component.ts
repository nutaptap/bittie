import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  SocialLoginModule,
  SocialAuthService,
  SocialUser,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  user: SocialUser | undefined;
  loggedIn: boolean = false;
  loading = true;
  data: any[] = [];
  currentUrl: string = '';
  customUrl: string | null = null;
  idUrl: string | null = null;

  constructor(
    private location: Location,
    private authService: SocialAuthService,
    private httpClient: HttpClient,
    private router: Router,
    public userId: UserServiceService
  ) {
    this.currentUrl = this.location.path().substring(1);
    this.httpClient = httpClient;
  }

  fetchData(): Observable<any> {
    return this.httpClient.get('https://bittie-production.up.railway.app/');
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
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loggedIn = true;
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    });

    this.fetchData().subscribe((data: any) => {
      this.data = data;
      this.findCustom();
      this.findId();
      this.redirect();
    });

    if (this.loggedIn && this.user !== undefined) {
      this.userId.setUser(this.user.id);
    }
  }

  handleLogout(event: void) {
    this.user = undefined;
    this.loggedIn = false;
    sessionStorage.removeItem('user');
    this.userId.clearUser();
    location.reload();
  }
}

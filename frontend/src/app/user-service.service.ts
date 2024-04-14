import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private userSignal = signal<string | undefined>(undefined);

  readonly user = this.userSignal.asReadonly();

  setUser(newUser: string) {
    this.userSignal.set(newUser);
  }

  clearUser() {
    this.userSignal.set(undefined);
  }
}

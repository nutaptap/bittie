import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  id: string | undefined = undefined;

  getId(): string | undefined {
    return this.id;
  }

  setId(id: string | undefined) {
    this.id = id;
  }
}

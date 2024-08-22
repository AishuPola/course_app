import { Injectable } from '@angular/core';
import { Course } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor() {}

  async signup(credentials: Course) {
    return fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}

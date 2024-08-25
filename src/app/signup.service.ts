import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  signup(credentials: any): Promise<any> {
    return fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Signup request failed');
      }
      return res.json();
    });
  }
}

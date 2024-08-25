import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { resolveTypeReferenceDirective } from 'typescript';
export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  course_img: string;
  course_video: string;
}
export type InewCourse = Omit<Course, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSubject.next(storedUsername);
    }
  }

  login(username: string, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.usernameSubject.next(username); // Update the username
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roleId');
    this.usernameSubject.next(null); // Clear the username
  }
  getAllCourses(): Promise<Course[]> {
    return fetch('http://localhost:4000/courses').then((res) => res.json());
  }

  getCourseById(id: string): Promise<Course> {
    return fetch(`http://localhost:4000/courses/${id}`).then((res) =>
      res.json()
    );
  }

  addCourse(newItem: InewCourse) {
    return fetch(`http://localhost:4000/courses`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async deleteCourse(courses: Course) {
    const res = await fetch(`http://localhost:4000/courses/${courses.id}`, {
      method: 'DELETE',
    });
    return await res.json();
  }

  // search(searchTerm: string): Observable<Course[]> {
  //   return this.http.get<Course[]>(
  //     `http://localhost:4000/courses?search=${searchTerm}`
  //   );
  // }

  editItem(editItem: Course) {
    return fetch(`http://localhost:4000/courses/${editItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(editItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}

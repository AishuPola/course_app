import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Course, CourseService } from '../course.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    RouterLink,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    CurrencyPipe,
    CommonModule,
    AppComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  constructor(public courseinfo: CourseService, private router: Router) {
    this.isLoggedIn = this.checkToken();
  }
  @Input() id!: string;

  @Output() deleteItemEvent: EventEmitter<Course> = new EventEmitter<Course>();

  isLoggedIn: boolean;

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  openCoursedetails() {
    this.router.navigate(['/details', this.course.id]);
  }

  deleteCourse() {
    this.deleteItemEvent.emit(this.course);
  }

  canEditOrDelete(): boolean {
    const roleId = localStorage.getItem('roleId');
    const username = localStorage.getItem('username');
    if (roleId) {
      // Parse the stored JSON
      return roleId === '0' || this.course.name === username; // Return true if roleId is '0'
    }
    return false;
  }

  @Input() course = {
    id: '',
    course_img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7BF8l33vU2D0uFaqtdV5ullV7adyOIoRtLw&s',
    course_video: 'https://youtu.be/_uQrJ0TkZlc',
    price: 250,
    description: 'python is a oop lang',

    name: 'python',
  };
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../course.service';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { setUser } from '../global';
import { Course } from '../course.service';
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
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  userId = setUser.roleId;
  @Input() id!: string;

  @Output() confirmEdit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() deleteItemEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() editItemEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Input() course = {
    id: '',
    course_img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7BF8l33vU2D0uFaqtdV5ullV7adyOIoRtLw&s',
    course_video: 'https://youtu.be/_uQrJ0TkZlc',
    price: 250,
    description: 'python is a oop lang',

    name: 'python',
  };

  isLoggedIn: boolean;

  constructor(public courseinfo: CourseService, private router: Router) {
    this.isLoggedIn = this.checkToken();
  }
  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  openCoursedetails() {
    this.router.navigate(['/details', this.course.id]);
  }
  addcart() {}

  deleteCourse() {
    this.deleteItemEvent.emit(this.course);
  }

  editCourse() {
    this.confirmEdit.emit(this.course);
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
}

import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { InewCourse, Course, CourseService } from '../course.service';

@Component({
  selector: 'app-addcourse',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.scss',
})
export class AddcourseComponent {
  allCourses: Array<Course> = [];
  CourseForm!: FormGroup;
  constructor(
    public courseservice: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.CourseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      course_img: [
        '',
        [Validators.required, Validators.pattern(/^https:\/\/.*/)],
      ],
      course_video: [
        '',
        [Validators.required, Validators.pattern(/^https:\/\/.*/)],
      ],
      price: [],

      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  addCourse() {
    if (this.CourseForm.valid) {
      let newCourse: InewCourse = this.CourseForm.value;

      this.courseservice.addCourse(newCourse).then(() => {
        this.router.navigate(['courses']);
      });
    }
  }

  get name() {
    return this.CourseForm.get('name');
  }
  get course_img() {
    return this.CourseForm.get('course_img');
  }
  get course_video() {
    return this.CourseForm.get('course_video');
  }

  get description() {
    return this.CourseForm.get('description');
  }
  get price() {
    return this.CourseForm.get('price');
  }
}

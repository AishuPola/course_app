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
  courseForm: FormGroup;
  constructor(
    public courseService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // formGroup -> formControlName
    this.courseForm = this.fb.group({
      name: '',
      price: '',
      category: '',
      rating: '',
      instructor: '',
      description: '',
      prerequisites: '',
      imageUrl: '',
    });
  }
  ngOnInit() {
    this.courseForm = this.fb.group({
      name: '',
      price: 199,
      category: '',
      rating: '',
      instructor: '',
      description: '',

      course_image: '',
      course_video: '',
    });
  }
  addCourse() {
    if (this.courseForm.value) {
      let courseadd: Course = this.courseForm.value;

      this.courseService.addCourse(courseadd).then(() => {
        this.router.navigate(['courses']);
      });
    }
  }
  get name() {
    return this.courseForm.get('name');
  }
  get image() {
    return this.courseForm.get('course_image');
  }
  get video() {
    return this.courseForm.get('course_video');
  }
  get rating() {
    return this.courseForm.get('rating');
  }
  get instructor() {
    return this.courseForm.get('instructor');
  }
  get description() {
    return this.courseForm.get('description');
  }
  get category() {
    return this.courseForm.get('category');
  }
}

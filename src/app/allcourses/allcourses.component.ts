import { Component } from '@angular/core';
import { Course, CourseService } from '../course.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  startWith,
  debounceTime,
  switchMap,
  catchError,
  of,
  Observable,
} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CoursesComponent } from '../courses/courses.component';
@Component({
  selector: 'app-allcourses',
  standalone: true,
  imports: [
    CoursesComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './allcourses.component.html',
  styleUrl: './allcourses.component.scss',
})
export class AllcoursesComponent {
  allCourses: Array<Course> = [];
  filteredCourses: Array<Course> = [];
  searchForm!: FormGroup;
  isLoading: boolean = true;
  dialouge: boolean = false;
  name: string | null = null;
  course: any = [];
  imageUrl: string = '';
  videoUrl: string = '';
  price: number = 0;
  description: string = '';
  end: number = 9;

  constructor(private courservice: CourseService, private router: Router) {}

  ngOnInit() {
    // this.searchForm
    //   .get('search')
    //   ?.valueChanges.pipe(
    //     startWith(''),
    //     debounceTime(300),
    //     switchMap((searchTerm) =>
    //       // // this.courservice.search(searchTerm).pipe(
    //       // //   catchError((err) => {
    //       // //     console.log(err);
    //       // //     return of([]);
    //       // //   })
    //       // )
    //     )
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.filteredCourses = data;
    //   });
    this.loadCourses();
    this.checktokenusername();
  }

  // filterItems(searchTerm: string): Observable<Course[]> {
  //   return this.courservice.;
  // //   return this.courservice.search(searchTerm);
  // }

  loadMore() {
    this.end = this.end + 9;
    this.loadCourses();
  }
  checktokenusername() {
    this.name = localStorage.getItem('username');
  }

  loadCourses() {
    this.isLoading = true;
    this.courservice
      .getAllCourses()
      .then((data) => {
        this.filteredCourses = data.slice(0, this.end);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading courses:', error);
        this.isLoading = false;
      });
  }

  yesButton() {
    var body = {
      course_video: this.videoUrl,
      course_img: this.imageUrl,
      price: this.price,
      description: this.description,
      id: this.course.id,
      name: this.course.name,
    };
    this.courservice.editItem(body).then(() => {
      this.loadCourses();
      this.dialouge = false;
    });
  }
  noButton() {
    this.dialouge = false;
  }

  deleteCourseP(courses: Course) {
    this.courservice.deleteCourse(courses).then(() => {
      this.loadCourses();
    });
  }

  confirmEdit(course: Course) {
    this.imageUrl = course.course_img;
    this.videoUrl = course.course_video;
    this.price = course.price;
    this.description = course.description;
    this.dialouge = true;
    this.course = course;
  }
}

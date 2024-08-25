import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-categories',
  standalone: true,
  imports: [
    CoursesComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
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
  id: string = '';

  constructor(
    private courservice: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string;
    // this.id = id.replace(/%20/g, ' ');
    this.id = id;
    console.log(id);
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

  checktokenusername() {
    this.name = localStorage.getItem('username');
  }

  loadCourses() {
    this.isLoading = true;
    this.courservice
      .getAllCourses()
      .then((data) => {
        this.allCourses = data;
        this.filteredCourses = data.filter(
          (value: any) => value.category === this.id
        ); // Initialize filteredItems with all items
        console.log(this.filteredCourses);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading courses:', error);
        this.isLoading = false;
      });
  }

  yesButton() {
    console.log(this.price);
    let body = {
      course_video: this.videoUrl,
      course_img: this.imageUrl,
      price: this.price,
      description: this.description,
      id: this.course.id,
      name: this.course.name,
    };
    console.log(body);
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

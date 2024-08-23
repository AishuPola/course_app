import { Component } from '@angular/core';
import { Course, CourseService } from '../course.service';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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

import { CommonModule } from '@angular/common';

import { MatCard, MatCardContent } from '@angular/material/card';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
@Component({
  selector: 'app-allcourses',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatCard,
    RouterLink,
    RouterOutlet,
    MatIcon,
    MatCard,
    MatCardContent,
    MatIconButton,
  ],
  templateUrl: './allcourses.component.html',
  styleUrl: './allcourses.component.scss',
})
export class AllcoursesComponent {
  // allCourses: Array<Course> = [];
  // filteredCourses: Array<Course> = [];
  // searchForm!: FormGroup;
  // isLoading: boolean = true;
  // name: string | null = null;

  // constructor(private fb: FormBuilder, private courservice: CourseService) {}
  //   this.searchForm = this.fb.group({
  //     search: '',
  //   });
  // }

  // ngOnInit() {
  //   this.searchForm
  //     .get('search')
  //     ?.valueChanges.pipe(
  //       startWith(''),
  //       debounceTime(300),
  //       switchMap((searchTerm) =>
  //         this.courservice.search(searchTerm).pipe(
  //           catchError((err) => {
  //             console.log(err);
  //             return of([]);
  //           })
  //         )
  //       )
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.filteredCourses = data;
  //     });
  //   this.loadCourses();
  //   this.checktokenusername();
  // }

  // filterItems(searchTerm: string): Observable<Course[]> {
  //   return this.courservice.search(searchTerm);
  // }

  // checktokenusername() {
  //   this.name = localStorage.getItem('username');
  // }

  // loadCourses() {
  //   this.isLoading = true;
  //   this.courservice
  //     .getAllCourses()
  //     .then((data) => {
  //       this.allCourses = data;
  //       // this.filteredCourses = data; // Initialize filteredItems with all items
  //       // this.isLoading = false;
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error loading courses:', error);
  //       this.isLoading = false;
  //     });
  // }

  // deleteCourseP(courses: Course) {
  //   this.courservice.deleteCourse(courses).then(() => {
  //     this.loadCourses();
  //   });
  // }

  courseData: any;
  id!: string;
  search: any;
  filteredData: any;
  constructor(private service: CourseService, private router: Router) {}
  ngOnInit() {
    this.service.getAllCourses().then((res) => {
      this.courseData = res;
      this.filteredData = this.courseData;
      console.log(this.filteredData);
    });
  }
  searchCourse() {
    this.service.getAllCourses().then((res) => {
      this.courseData = res;
      if (this.search) {
        this.filteredData = this.courseData.filter(
          (resk: any) =>
            resk.coursename.toLowerCase() === this.search.toLowerCase()
        );
      } else {
        this.filteredData = this.courseData;
      }
    });
  }
  show = true;

  toggleSummary() {
    this.show = !this.show;
  }
}

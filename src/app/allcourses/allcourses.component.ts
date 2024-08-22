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
  name: string | null = null;

  constructor(private fb: FormBuilder, private courservice: CourseService) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((searchTerm) =>
          this.courservice.search(searchTerm).pipe(
            catchError((err) => {
              console.log(err);
              return of([]);
            })
          )
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.filteredCourses = data;
      });
    this.loadCourses();
    this.checktokenusername();
  }

  filterItems(searchTerm: string): Observable<Course[]> {
    return this.courservice.search(searchTerm);
  }

  checktokenusername() {
    this.name = localStorage.getItem('username');
  }

  loadCourses() {
    this.isLoading = true;
    this.courservice
      .getAllCourses()
      .then((data) => {
        this.allCourses = data;
        this.filteredCourses = data; // Initialize filteredItems with all items
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading courses:', error);
        this.isLoading = false;
      });
  }

  deleteCourseP(courses: Course) {
    this.courservice.deleteCourse(courses).then(() => {
      this.loadCourses();
    });
  }
}

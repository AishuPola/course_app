import { Component, Input, Output } from '@angular/core';
import { CourseService } from '../course.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  courses: any; // Adjust type according to your data structure
  filteredCourses: any[] = []; // Adjust type according to your data structure
  searchForm!: FormGroup;
  isLoading = true;
  errorMessage: string | null = null;
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCourses();
  }
  loadCourses() {
    let category = this.route.snapshot.paramMap.get('category') as string;
    console.log(category);
    this.courseService.getAllCourses().then((data) => {
      this.courses = data;
      this.filteredCourses = this.filterCoursesByCategory(
        this.courses,
        category
      );
      this.isLoading = false;
    });
  }
  private filterCoursesByCategory(courses: any[], searchTerm: string): any[] {
    return courses.filter((course) =>
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  deleteCourse(course_to_be_deleted: any) {
    this.courseService
      .deleteCourse(course_to_be_deleted)
      .then(() => this.loadCourses());
  }
}

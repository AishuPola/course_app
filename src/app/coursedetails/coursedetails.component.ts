import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseService } from '../course.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-coursedetails',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.scss',
})
export class CoursedetailsComponent {
  course!: Course;

  msg = '';
  isLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute // DI
  ) {}

  // After Initialization of the component
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string;

    this.courseService
      .getCourseById(id)
      .then((data) => {
        this.course = data;
        this.isLoading = false;
        console.log(data);
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }
}

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
  @Input() course!: Course;

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
      })
      .catch(() => {
        this.msg = 'Something went wrong 🥲';
        this.isLoading = false;
      });
  }
}

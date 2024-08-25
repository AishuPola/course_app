import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseService } from '../course.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-coursedetails',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.scss',
})
export class CoursedetailsComponent {
  @Input() course!: Course;
  videoId: string = 'watch?v=8HyuVJZe5Xk&list=RD5vsOv_bcnhs&index=27';
  videoUrl: SafeResourceUrl;

  msg = '';
  isLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.videoUrl = '';
  }
  extractVideoId(url: string): string {
    const regExp =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string;

    this.courseService
      .getCourseById(id)
      .then((data) => {
        console.log(data);
        this.course = data;
        this.videoId = this.extractVideoId(data.course_video);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.videoId}`
        );
        this.isLoading = false;
      })
      .catch(() => {
        this.msg = 'Something went wrong 🥲';
        this.isLoading = false;
      });
  }
}

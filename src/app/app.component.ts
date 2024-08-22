import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CourseService } from './course.service';
import { Course } from './course.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course_app';
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  // username!: string | null;
  // isLoggedIn: boolean;

  // constructor(private router: Router, private courseService: CourseService) {
  //   this.isLoggedIn = this.checkToken();
  // }

  // checkToken(): boolean {
  //   const token = localStorage.getItem('token');
  //   return !!token;
  // }

  // ngOnInit() {
  //   this.courseService.username$.subscribe((username) => {
  //     this.username = username;
  //   });
  // }

  // logout() {
  //   this.courseService.logout();
  //   this.router.navigate(['/']);
  // }
  refreshView() {
    this.cdr.detectChanges();
  }
  refreshComponent(category: string) {
    this.router
      .navigate(['/categories', category], {
        queryParams: { refresh: new Date().getTime() },
      })
      .then(() => {
        this.refreshView(); // Manually trigger change detection
      });
  }
}

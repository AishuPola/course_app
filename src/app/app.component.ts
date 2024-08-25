import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CourseService } from './course.service';
import { Course } from './course.service';
import { FormsModule } from '@angular/forms';
import { setUser } from './global';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course_app';
  selectedOption: string = 'category';

  user: any = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    setUser.userEmail = localStorage.getItem('token') || '';
    setUser.roleId = localStorage.getItem('roleId') || '';
    this.user = setUser.userEmail;
  }
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
  logout() {
    setUser.userEmail = '';
    this.user = '';
    setUser.roleId = '';
    localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }
  onOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/categories', selectedValue]);
  }
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

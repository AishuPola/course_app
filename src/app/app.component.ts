import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course_app';

  name: string | null = null;

  ngOnInit() {
    this.checktokenusername();
  }

  checktokenusername() {
    this.name = localStorage.getItem('username');
  }
}

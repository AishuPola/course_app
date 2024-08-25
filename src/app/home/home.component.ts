import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { setUser } from '../global';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // name: string | null = null;
  // ngOnInit() {
  //   this.checktokenusername();
  // }
  // checktokenusername() {
  //   this.name = localStorage.getItem('username');
  // }
  constructor(private router: Router) {}
  getStarted() {
    if (setUser.roleId) {
      this.router.navigate(['courses']);
    } else {
      this.router.navigate(['signup']);
    }
  }
}

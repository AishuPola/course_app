import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-snackbarforcart',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './snackbarforcart.component.html',
  styleUrl: './snackbarforcart.component.scss',
})
export class SnackbarforcartComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<SnackbarforcartComponent>,
    private router: Router
  ) {}

  viewCart() {
    this.snackBarRef.dismiss(); // Close the snack bar
    this.router.navigate(['/cart']); // Navigate to the cart page
  }

  close() {
    this.snackBarRef.dismiss(); // Close the snack bar
  }
}

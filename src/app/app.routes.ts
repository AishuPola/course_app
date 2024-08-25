import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';

import { AllcoursesComponent } from './allcourses/allcourses.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'categories/:id',
    component: CategoriesComponent,
  },
  {
    path: 'courses',
    component: AllcoursesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'details/:id',
    component: CoursedetailsComponent,
  },

  {
    path: 'courses/cart',
    component: CartComponent,
  },
];

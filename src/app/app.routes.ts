import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { AddcourseComponent } from './addcourse/addcourse.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'courses',
    component: AllcoursesComponent,
  },
  {
    path: 'addcourses',
    component: AddcourseComponent,
  },
  {
    path: 'courses/:id',
    component: CoursedetailsComponent,
    canActivate: [authGuard],
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
    path: 'cart',
    component: CartComponent,
  },
];

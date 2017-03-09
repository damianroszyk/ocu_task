import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services/auth.guard';
import {LoginGuard} from './services/login.guard';
import {BatchDetailComponent} from './batch-detail/batch-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'batch/:id',
    component: BatchDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

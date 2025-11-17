import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/login/login').then(m => m.Login),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/layout/layout').then(m => m.Layout),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile').then(m => m.Profile),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users').then(m => m.Users),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products').then(m => m.Products),
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/products/products.component')
        .then(module => module.ProductsComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];

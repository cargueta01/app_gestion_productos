import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  submit(): void {
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const returnUrl =
      this.activatedRoute.snapshot.queryParamMap
        .get('returnUrl') || '/products';

    this.authService.login(this.loginForm.getRawValue())
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.loading.set(false);

          if (error.status === 401) {
            this.errorMessage.set(
              'El email o la contraseña son incorrectos'
            );
          } else {
            this.errorMessage.set(
              'No fue posible conectar con el servidor'
            );
          }
        }
      });
  }
}
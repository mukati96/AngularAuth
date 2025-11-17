import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Loader } from "../../shared/component/loader/loader";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Loader],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);

  username = signal('');
  password = signal('');
  rememberMe = signal(false);
  errorMsg = signal('');


  updateUsername(value: string) {
    this.username.set(value);
  }

  updatePassword(value: string) {
    this.password.set(value);
  }

  toggleRememberMe(value: boolean) {
    this.rememberMe.set(value);
  }

  isFormValid = computed(() => 
    this.username().trim() !== '' && 
    this.password().trim() !== '' && 
    this.rememberMe()
  );

  onSubmit() {
    if (!this.isFormValid()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill all fields before logging in.',
        confirmButtonColor: '#e4c2cf'
      });
      return;
    }

    this.loading.set(true); // show loader

    const credentials = {
      username: this.username(),
      password: this.password()
    };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        this.loading.set(false); // hide loader
        if (response?.accessToken) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting to your dashboard...',
            confirmButtonColor: '#00ff00'
          }).then(() => {
            this.router.navigate(['/profile']);
          });
        }
      },
      error: () => {
        this.loading.set(false); // hide loader
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password.',
          confirmButtonColor: '#c0392b'
        });
      }
    });
  }
}
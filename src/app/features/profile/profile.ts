import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/auth';
import { Router } from 'express';
import { Api } from '../../core/service/api';
import { CommonModule } from '@angular/common';
import { Loader } from "../../shared/component/loader/loader";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Loader],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  loading = signal(false);
  private apiService = inject(Api);
  users = signal<any>({});
  constructor() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.loading.set(true);
    this.apiService.getProfile().subscribe({
      next: (res) => {
        this.users.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Profile fetch error:', err);
      }
    });
  }

}

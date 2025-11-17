import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { Api } from '../../core/service/api';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { Loader } from "../../shared/component/loader/loader";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Loader],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  users:any = []
  allUsers: any[] = []; 
  searchControl = new FormControl('');
  loading = signal(false);

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.apiService.getUsersList().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.allUsers = res.users;
        this.users = [...this.allUsers];
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        map(term => (term || '').toLowerCase()),
        map(term => this.allUsers.filter(u =>
          u.firstName.toLowerCase().includes(term) || 
          u.lastName.toLowerCase().includes(term)
        ))
      )
      .subscribe(filtered => this.users = filtered);
  }

  viewDetails(user: any) {
    console.log('Viewing details for user:', user);
  }
}

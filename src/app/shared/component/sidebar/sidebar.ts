import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  confirmLogout(): void {
    Swal.fire({
      imageUrl: 'assets/delete.png',
      title: 'Are you sure!',
      text: 'This action will log you out of your session.',
      imageWidth: 150,
      imageHeight: 120,
      imageAlt: 'Custom image',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Log Out',
      customClass: {
        popup: 'logout-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Logged out successfully',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');
      this.router.navigate(['/login']);
    }
  }
}

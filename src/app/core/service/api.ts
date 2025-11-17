import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private base_url = environment.apiUrl;  

  getProfile() {
    const token = typeof window !== 'undefined' 
    ? localStorage.getItem('jwt_token') 
    : null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.base_url + '/auth/me', { headers });
  }

  getUsersList() {
    const token = typeof window !== 'undefined' 
    ? localStorage.getItem('jwt_token') 
    : null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.base_url + '/users', { headers });
  }

  getProduct() {
    const token = typeof window !== 'undefined' 
    ? localStorage.getItem('jwt_token') 
    : null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.base_url + '/products', { headers });
  }

}

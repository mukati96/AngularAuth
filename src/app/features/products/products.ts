import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Api } from '../../core/service/api';
import { Loader } from "../../shared/component/loader/loader";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Loader],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products = signal([]);
  sortOrder = signal<'asc' | 'desc'>('asc');
  loading = signal(false);

  sortedProducts:any = computed(() => {
    return [...this.products()].sort((a:any, b:any) =>
      this.sortOrder() === 'asc' ? a.price - b.price : b.price - a.price
    );
  });

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.apiService.getProduct().subscribe({
      next: (res: any) => {
        this.products.set(res.products);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  toggleSort() {
    this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
  }
}

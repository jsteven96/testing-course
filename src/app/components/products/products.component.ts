import { ValueService } from './../../services/value.service';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  suscriptions: Subscription[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta = '';

  constructor(
    private productsservice: ProductsService,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    const suscripcionProductos = this.productsservice
      .getAll(this.limit, this.offset)
      .subscribe({
        next: (res) => {
          this.products = [...this.products, ...res];
          this.offset += this.limit;
          this.status = 'success';
        },
        error: (error) => {
          setTimeout(() => {
            this.products = [];
            this.status = 'error';
          }, 3000);
        },
      });
    this.suscriptions.push(suscripcionProductos);
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((sus) => sus.unsubscribe());
  }
}

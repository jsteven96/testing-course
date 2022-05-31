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
  constructor(private productsservice: ProductsService) {}

  ngOnInit(): void {
    this.getAllProdcuts();
  }

  getAllProdcuts() {
    this.productsservice.getAllSimple().subscribe((res) => {
      this.products = res;
    });
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((sus) => sus.unsubscribe());
  }
}

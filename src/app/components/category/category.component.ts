import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {Router} from '@angular/router';
import { ProductModelServer, ServerResponse } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

}

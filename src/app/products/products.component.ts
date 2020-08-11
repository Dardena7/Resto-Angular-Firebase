import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from "../model/product.model";
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Choice } from '../model/choice.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  productsSub = new Subscription();
  selectedCategory = null;
  cart = null;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.productsSub = this.productsService.productsSubject.subscribe(
      products => {
        const category = this.categoriesService.getSelectedCategory(); 
        this.products = this.productsService.getFilteredProducts(category);
      }
    );

    this.productsService.getProducts(); 

    this.categoriesService.categoryChanged.subscribe(
      category => {
        this.selectedCategory = category;
        this.products = this.productsService.getFilteredProducts(category);       
      }
    );
  }

  ngOnDestroy(): void {
   this.productsSub.unsubscribe();
  }

  addToCart(product: Product): void {
    if (product.supplements || product.sidedishes) {
      this.router.navigate(['/shop', product.id]);
    }
    else {
      this.cartService.addChoice(new Choice(product, [], null, 1));
    }
  }

}

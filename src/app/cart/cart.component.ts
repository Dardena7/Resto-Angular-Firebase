import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
import { Order } from '../model/order.model';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/order.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  infosMode: boolean = false;
  orderSaved: boolean = false;

  constructor(
    private cartService: CartService, 
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    
  }

  removeProduct(index: number) {
    this.cartService.removeProduct(index);
    
  }

  onOrder() {
    this.infosMode = true;
  }

  onSubmit(form: NgForm) {
    const order = new Order(
      form.value.name,
      form.value.address,
      form.value.email,
      this.cart
    );
    this.ordersService.post(order).subscribe(
      response => { 
        this.cart.reset(); 
        this.orderSaved = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      }
    );
  }

}

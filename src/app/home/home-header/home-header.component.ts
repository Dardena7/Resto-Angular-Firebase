import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  cartSize: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartSize.subscribe(
      size => {this.cartSize = size;}
    );
    this.cartSize = this.cartService.getSize();
  }

}

import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/order.service';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.ordersSubject.subscribe(
      orders => { this.orders = orders.reverse();}
    );
    this.ordersService.getOrders();
  }

}

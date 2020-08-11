import { Injectable } from '@angular/core'
import { DataStorageService } from './data-storage.service';
import { Cart } from '../model/cart.model';
import { Order } from '../model/order.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrdersService {

    collection: string = 'orders'
    orders: Order[] = [];
    ordersSubject = new Subject<Order[]>();

    constructor(private dataStorageService: DataStorageService) {}

    getOrders() {
        this.dataStorageService.getAll(this.collection).subscribe(
            orders => { 
                this.orders = orders;
                if (orders != null)
                    this.orders = this.treatDatas(orders);
                else
                    this.orders = []; 
                this.ordersSubject.next(this.orders.slice());
            }
        ); 
    }

    post(order: Order) { 
        return this.dataStorageService.postUnsigned(this.collection, order);
    }

    private treatDatas(products: Object) {
        const result = [];
        for (const [key, value] of Object.entries(products)) {
            value.id = key;
            result.push(value);
        }
        return result;
    }
    
}
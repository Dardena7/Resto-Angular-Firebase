import { Injectable, EventEmitter } from '@angular/core'; 
import { Cart } from '../model/cart.model';
import { Choice } from '../model/choice.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CartService {
    
    cart: Cart = new Cart([]);
    cartSize = new Subject<number>();
    productAdded = new EventEmitter<string>();

    addChoice(choice: Choice) {
        this.cart.addChoice(choice);
        this.cartSize.next(this.getSize());
        this.productAdded.emit('You product has been added to the cart !');
    }

    getSize(): number {
        return this.cart.choices.length;
    }

    removeProduct(index: number) {
        this.cart.removeProduct(index);
        console.log(this.cart);
    }

}
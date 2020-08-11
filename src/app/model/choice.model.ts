import { Product } from './product.model';
import { Sidedish } from './sidedish.model';
import { Supplement } from './supplement.model';

export class Choice {
    product: Product;
    sidedishes: Sidedish[];
    supplement: Supplement;
    quantity: number;
    total: number;

    constructor(product: Product,
        sidedishes: Sidedish[],
        supplement: Supplement,
        quantity: number) {
            this.product = product;
            this.sidedishes = sidedishes;
            this.supplement = supplement;
            this.quantity = quantity;
            this.calculTotal();
    }

    calculTotal() {
        this.total = this.product.price;
        for (const sidedish of this.sidedishes) {
            this.total += sidedish.price;
        }
        this.total *= this.quantity;
    }

    increaseQty() {
        this.quantity++;
        this.calculTotal();
    }

    decreaseQty() {
        this.quantity--;
        this.calculTotal();
    }
}
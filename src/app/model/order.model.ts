import { Cart } from './cart.model';

export class Order {
    name: string;
    address: string;
    email: string;
    cart: Cart;

    constructor(
        name: string,
        address: string,
        email: string,
        cart: Cart
    ) 
    {
        this.name = name;
        this.address = address;
        this.email = email;
        this.cart = cart;
    }
}
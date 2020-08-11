import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/model/cart.model';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Supplement } from 'src/app/model/supplement.model';
import { Sidedish } from 'src/app/model/sidedish.model';
import { Choice } from 'src/app/model/choice.model';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

    cart: Cart = null;
    product: any;
    supplements: Supplement[];
    sidedishes: Sidedish[];

    chosenSupplement: Supplement = null;
    chosenSidedishes: Sidedish[] = [];
    totalPrice = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService,
        private productsService: ProductsService) {}

    ngOnInit(): void {
        this.cart = this.cartService.cart;
        this.route.params.subscribe((params: Params) => {
            const id = params['productId'];
            this.productsService.getProduct(id).subscribe(
                (product: any) => {
                    if (!product) {
                        this.router.navigate(['/shop']);
                    }
                    let supplements = product.supplements;
                    let sidedishes = product.sidedishes;
                    if (!supplements) {
                        supplements = [];
                    }
                    if (!sidedishes) {
                        sidedishes = [];
                    }
                    this.product = new Product(
                        product.id,
                        product.name,
                        product.description,
                        product.image,
                        product.price,
                        product.active,
                        product.categoryId,
                        supplements,
                        sidedishes
                    );
                    if (this.product.supplements.length > 0) {
                        this.chosenSupplement= this.product.supplements[0];
                    }
                    this.totalPrice = this.product.price; 
                }
            );
        });
    }

    addToCart() {
        this.cartService.addChoice(
            new Choice(
                this.product, 
                this.chosenSidedishes, 
                this.chosenSupplement,
                1
            )
        );
    }

    addSidedish(index) {
        const position = this.chosenSidedishes.indexOf(this.product.sidedishes[index]);
        if (position === -1){
            this.chosenSidedishes.push(this.product.sidedishes[index]);
            this.totalPrice += this.product.sidedishes[index].price;
        }
        else {
            this.chosenSidedishes.splice(position, 1);
            this.totalPrice -= this.product.sidedishes[index].price;
        }
    }

    cancel() {
        this.router.navigate(['/shop']);
    }

}
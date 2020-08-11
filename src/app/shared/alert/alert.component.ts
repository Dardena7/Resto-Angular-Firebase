import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

    message: string = '';
    visible: boolean = false;
    timer: any;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.productAdded.subscribe(
            message => { this.showMessage(message); }
        );
    }

    showMessage(message: string): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.visible = false;
        }
        this.message = message;
        this.visible = true;
        this.timer = setTimeout(() => {
            this.visible = false;
        }, 1000);
    }
}
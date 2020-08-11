import { Choice } from './choice.model';

export class Cart {
    choices: Choice[];
    total: number;

    constructor(choices: Choice[]) {
            this.choices = choices;
            this.calculTotal();
    }

    calculTotal() {
        this.total = 0;
        for (const choice of this.choices) {
            this.total += choice.total;
        }
    }

    addChoice(choice: Choice) {
        this.choices.push(choice);
        this.calculTotal();
    }

    removeProduct(index: number) {
        this.choices.splice(index, 1);
        this.calculTotal();
    }

    reset() {
        this.choices = [];
        this.total = 0;
    }
}
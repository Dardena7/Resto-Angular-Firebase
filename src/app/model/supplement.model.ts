export class Supplement {
    id: string;
    name: string;
    price: number;
    active: boolean;

    constructor(
        id: string,
        name: string,
        price: number,
        active: boolean,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.active = active;
    }
}
import { Supplement } from "./supplement.model";
import { Sidedish } from "./sidedish.model";
import { Category } from "./category.model";

export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    active: boolean;
    categoryId: string;
    supplements: Supplement[];
    sidedishes: Sidedish[];

    constructor(
        id: string,
        name: string,
        description: string,
        image: string,
        price: number,
        active: boolean,
        categoryId: string,
        supplements: Supplement[],
        sidedishes: Sidedish[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image,
        this.price = price;
        this.active = active;
        this.categoryId = categoryId;
        this.supplements = supplements;
        this.sidedishes = sidedishes;
    }
}
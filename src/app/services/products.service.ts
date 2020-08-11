import { Injectable } from "@angular/core";
import { Product } from "../model/product.model";
import { Category } from '../model/category.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Sidedish } from '../model/sidedish.model';
import { Supplement } from '../model/supplement.model';

@Injectable({providedIn: "root"})
export class ProductsService {
    private collection = 'products';
    private products: Product[] = [];

    constructor(private dataStorageService: DataStorageService) {}

    productsSubject = new Subject<Product[]>();

    getProducts() {
      this.dataStorageService.getAll(this.collection).subscribe(
        products => {
          if (products != null)
            this.products = this.treatDatas(products);
          else
            this.products = [];
            
          this.productsSubject.next(this.products.slice());
        }
      ); 
    }

    getProduct(id: string) {
      return this.dataStorageService.getObject(this.collection, id);
    }

    postProduct(product: Product) {
      this.dataStorageService.post(this.collection, product).subscribe(
          response => { this.getProducts();}
      );
    }

    deleteProduct(id: string) {
      this.dataStorageService.delete(this.collection, id).subscribe(
          response => {
              this.getProducts(); 
          }
      );
    }

    updateProduct(product: Product) {
      this.dataStorageService.patch(this.collection, product).subscribe(
          response => { this.getProducts();}
      );
  }

  private treatDatas(products: Object) {
      const result = [];
      for (const [key, value] of Object.entries(products)) {
          value.id = key;
          result.push(value);
      }
      return result;
  }

  getFilteredProducts(category: Category) {
    const products = [];
    for (const product of this.products) {
      if (category === null) {
        if (product.categoryId === "") {
          products.push(product);
        }
      } 
      else if (product.categoryId === category.id) {
        products.push(product);
      }
    }
    return products;
  }

  deleteCategory(id: string): void {
    this.dataStorageService.getAll(this.collection).subscribe(
      products => {
        for (const [key, value] of Object.entries(products)) {
          if (value.categoryId === id) {
            
            value.id = key;
            value.categoryId = "";
            this.updateProduct(value);
          }
        }
      }
    );
  }

  deleteSidedish(id: string): void {
    this.dataStorageService.getAll(this.collection).subscribe(
      products => {
        if (!products)
          return;
        for (const [key, value] of Object.entries(products)) {
          if (!value.sidedishes)
            continue;
          let sidedishes = value.sidedishes;
          let hasChanged = false;
          for (let i=0; i < sidedishes.length; ++i) {
            if (sidedishes[i].id === id) {
              sidedishes.splice(i,1);
              --i;
              hasChanged = true;
            }
          }
          if (hasChanged) {
            value.id = key;
            this.updateProduct(value);
          }
        }
      }
    );
  }

  updateSidedish(sidedish: Sidedish): void {
    this.dataStorageService.getAll(this.collection).subscribe(
      products => {
        if (!products)
          return;
        for (const [key, value] of Object.entries(products)) {
          if (!value.sidedishes)
            continue;
          let sidedishes = value.sidedishes;
          let hasChanged = false;
          for (let i=0; i < sidedishes.length; ++i) {
            if (sidedishes[i].id === sidedish.id) {
              sidedishes[i] = sidedish;
              hasChanged = true;
            }
          }
          if (hasChanged) {
            value.id = key;
            this.updateProduct(value);
          }
        }
      }
    );
  }

  deleteSupplement(id: string): void {
    this.dataStorageService.getAll(this.collection).subscribe(
      products => {
        if (!products)
          return;
        for (const [key, value] of Object.entries(products)) {
          let supplements = value.supplements;
          let hasChanged = false;
          if (!value.supplements)
            continue;
          for (let i=0; i < supplements.length; ++i) {
            if (supplements[i].id === id) {
              supplements.splice(i,1);
              --i;
              hasChanged = true;
            }
          }
          if (hasChanged) {
            value.id = key;
            this.updateProduct(value);
          }
        }
      }
    );
  }

  updateSupplement(supplement: Supplement): void {
    this.dataStorageService.getAll(this.collection).subscribe(
      products => {
        if (!products)
          return;
        for (const [key, value] of Object.entries(products)) {
          if (!value.supplements)
            continue;
          let supplements = value.supplements;
          let hasChanged = false;
          for (let i=0; i < supplements.length; ++i) {
            if (supplements[i].id === supplement.id) {
              supplements[i] = supplement;
              hasChanged = true;
            }
          }
          if (hasChanged) {
            value.id = key;
            this.updateProduct(value);
          }
        }
      }
    );
  }
}
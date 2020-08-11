import { Injectable, EventEmitter } from '@angular/core'
import { DataStorageService } from './data-storage.service';
import { Category } from '../model/category.model';
import { Subject } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root'})
export class CategoriesService {

    private collection: string = "categories";

    private selectedCategory: Category = null;
    categoryChanged = new EventEmitter<Category>();

    categories: Category[] = [];
    categoriesSubject = new Subject<Category[]>();

    constructor(
        private dataStorageService: DataStorageService,
        private productsService: ProductsService) {}

    getCategories() {
        this.dataStorageService.getAll(this.collection).subscribe(
            categories => {
                if(categories) {
                    this.categories = this.treatDatas(categories);
                    this.sortAlphaAsc(this.categories);
                }
                else {
                    this.categories = [];
                }
                this.categoriesSubject.next(this.categories.slice());
            }
        ); 
    }

    postCategory(category: Category) {
        this.dataStorageService.post(this.collection, category).subscribe(
            response => { this.getCategories();}
        );
    }

    deleteCategory(id: string) {
        this.dataStorageService.delete(this.collection, id).subscribe(
            response => {
                this.productsService.deleteCategory(id);
                this.getCategories(); 
            }
        );
    }

    updateCategory(category: Category) {
        this.dataStorageService.patch(this.collection, category).subscribe(
            response => { this.getCategories();}
        );
    }

    sortAlphaAsc(categories: Category[]) {
        if (!categories)
          return;
        this.categories.sort(this.compare);
    }

    private compare(a,b) {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        return 0;
    }

    private treatDatas(categories: Object) {
        const result = [];
        if (!categories)
          return;
        for (const [key, value] of Object.entries(categories)) {
            value.id = key;
            result.push(value);
        }
        return result;
    }

    setSelectedCategory(category: Category): void {
        this.selectedCategory = category;
        this.categoryChanged.emit(this.selectedCategory);
    }

    getSelectedCategory(): Category {
        if(!this.selectedCategory && this.categories.length > 0) {
            this.selectedCategory = this.categories[0];
        }
        return this.selectedCategory;
    }

}
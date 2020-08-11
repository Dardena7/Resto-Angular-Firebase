import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Product } from 'src/app/model/product.model';
import { Category } from 'src/app/model/category.model';
import { NgForm } from '@angular/forms';
import { SidedishesService } from 'src/app/services/sidedishes.service';
import { Sidedish } from 'src/app/model/sidedish.model';
import { SupplementsService } from 'src/app/services/supplements.service';
import { Supplement } from 'src/app/model/supplement.model';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsAdminComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product = null;
  categories: Category[] = [];
  sidedishes: Sidedish[] = [];
  supplements: Supplement[] = [];
  editMode = false;
  selectedCategory: Category = null;
  chosenSidedishes: Sidedish[] = [];
  chosenSupplements: Supplement[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private sidedishesService: SidedishesService,
    private supplementsService: SupplementsService) { }

  ngOnInit(): void {
    this.categoriesService.categoriesSubject.subscribe(
      categories => { this.categories = categories; }
    );
    this.categoriesService.getCategories();

    this.productsService.productsSubject.subscribe(
      products => { this.products = this.productsService.getFilteredProducts(this.selectedCategory); }
    );
    this.productsService.getProducts();

    this.sidedishesService.sidedishesSubject.subscribe(
      sidedishes => { this.sidedishes = sidedishes; }
    );
    this.sidedishesService.getSidedishes();

    this.supplementsService.supplementsSubject.subscribe(
      supplements => { this.supplements = supplements; }
    );
    this.supplementsService.getSupplements();

    this.categoriesService.categoryChanged.subscribe(
      category => {
        this.selectedCategory = category;
        this.products = this.productsService.getFilteredProducts(category);
      }
    );
  }

  onEdit(product: Product) {
    this.editMode = true;

    if (product.sidedishes)
      this.chosenSidedishes = product.sidedishes;
    else
      this.chosenSidedishes = [];

    if (product.supplements)
      this.chosenSupplements = product.supplements;
    else
      this.chosenSupplements = [];
      
    this.selectedProduct = new Product(
      product.id,
      product.name,
      product.description,
      product.image,
      product.price,
      product.active,
      product.categoryId,
      product.supplements,
      product.sidedishes
    );
  }

  onBack() {
    this.chosenSidedishes = [];
    this.chosenSupplements = [];
    this.editMode = false;
    this.selectedProduct = null;
  }

  onSubmitAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.productsService.postProduct(
      new Product(
        "",
        form.value.name,
        form.value.description,
        form.value.image,
        form.value.price,
        true,
        form.value.category,
        this.chosenSupplements,
        this.chosenSidedishes)
    );

    this.onBack();
    form.reset();
  }

  onDelete(id: string) {
    this.productsService.deleteProduct(id);
  }

  onSubmitEdit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const active = form.value.active === 'true' ? true : false;
    
    this.productsService.updateProduct(
      new Product(
        this.selectedProduct.id,
        form.value.name,
        form.value.description,
        form.value.image,
        form.value.price,
        active,
        form.value.category,
        this.chosenSupplements,
        this.chosenSidedishes)
    );
    form.reset();
    this.onBack();
  }

  onAddSidedish(form: NgForm) {
    if (form.value.sidedishes) {
      this.chosenSidedishes.push(form.value.sidedishes);
    }
  }

  onRemoveSidedish(sidedish: Sidedish) {
    const index = this.chosenSidedishes.indexOf(sidedish);
    this.chosenSidedishes.splice(index, 1);
  }

  onAddSupplement(form: NgForm) {
    if (form.value.supplements) {
      this.chosenSupplements.push(form.value.supplements);
    }
  }

  onRemoveSupplement(supplement: Supplement) {
    const index = this.chosenSupplements.indexOf(supplement);
    this.chosenSupplements.splice(index, 1);
  }

}

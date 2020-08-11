import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesAdminComponent implements OnInit {

  categories: Category[];
  editMode: boolean = false;
  selectedCategory: Category = null;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesService.categoriesSubject.subscribe(
      categories => { this.categories = categories }
    );
  }

  onSubmitAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.categoriesService.postCategory(new Category("",form.value.name));
    form.reset();
  }

  onSubmitEdit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.categoriesService.updateCategory(new Category(this.selectedCategory.id,form.value.name));
    this.selectedCategory = null;
    this.editMode = false;
    form.reset();
  }

  onEdit(category: Category) {
    this.editMode = true;  
    this.selectedCategory = new Category(category.id, category.name);
  }

  onDelete(id: string) {
    this.categoriesService.deleteCategory(id);
  }

  onBack() {
    this.editMode = false;
    this.selectedCategory = null;
  }

}

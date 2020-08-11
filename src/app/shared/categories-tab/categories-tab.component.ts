import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-categories-tab',
  templateUrl: './categories-tab.component.html',
  styleUrls: ['./categories-tab.component.css']
})
export class CategoriesTabComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory = null;
  @Input() showNoCategory: boolean;
  

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.categoriesSubject.subscribe(
      categories => {
        this.categories = categories;
        this.selectedCategory = this.categoriesService.getSelectedCategory();
        if (!this.showNoCategory && this.selectedCategory === null && this.categories.length > 0) {
          this.selectedCategory = this.categories[0];
        }
        this.categoriesService.setSelectedCategory(this.selectedCategory);
      }
    );
    this.categoriesService.getCategories();
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.categoriesService.setSelectedCategory(category);
  }

}

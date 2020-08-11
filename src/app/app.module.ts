import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './admin/header/header.component';
import { CategoriesAdminComponent } from './admin/categories/categories.component';
import { SupplementsAdminComponent } from './admin/supplements/supplements.component';
import { SidedishesAdminComponent } from './admin/sidedishes/sidedishes.component';
import { ProductsAdminComponent } from './admin/products/products.component';
import { CategoriesTabComponent } from './shared/categories-tab/categories-tab.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { AlertComponent } from './shared/alert/alert.component';

import { PriceValidator } from './directives/price-directive';
import { OrdersComponent } from './admin/orders/orders.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeHeaderComponent,
    ProductsComponent,
    CartComponent,
    AdminComponent,
    AuthComponent,
    HeaderComponent,
    CategoriesAdminComponent,
    SupplementsAdminComponent,
    SidedishesAdminComponent,
    ProductsAdminComponent,
    CategoriesTabComponent,
    ProductItemComponent,
    PriceValidator,
    AlertComponent,
    OrdersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

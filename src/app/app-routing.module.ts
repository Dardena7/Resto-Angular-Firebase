import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth-guard'
import { CategoriesAdminComponent } from './admin/categories/categories.component';
import { ProductsAdminComponent } from './admin/products/products.component';
import { SupplementsAdminComponent } from './admin/supplements/supplements.component';
import { SidedishesAdminComponent } from './admin/sidedishes/sidedishes.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { OrdersComponent } from './admin/orders/orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'shop', component: ProductsComponent },
  { path: 'shop/:productId', component: ProductItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
    { path: 'categories', component: CategoriesAdminComponent },
    { path: 'products', component: ProductsAdminComponent },
    { path: 'supplements', component: SupplementsAdminComponent },
    { path: 'sidedishes', component: SidedishesAdminComponent },
    { path: 'orders', component: OrdersComponent }
  ] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

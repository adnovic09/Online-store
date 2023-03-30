import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cart } from './models/cart.model';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { CartService } from './services/cart.service';
import { ProductListComponent } from './user/product-list/product-list.component';
import { UpdateProductComponent } from './user/update-product/update-product.component';

const routes: Routes = [{
  path:'home',
  component:HomeComponent
},  {path:'cart',
component:CartComponent
},
{path:'user',
component:ProductListComponent
},
{path:'update-Product/:id',
component:UpdateProductComponent
},
{
  path:'',redirectTo:'home',pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }

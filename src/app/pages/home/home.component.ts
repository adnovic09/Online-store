import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.moodel';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT:{[id:number]:number}={1:400,3:335,4:350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  cols=3;
  rowHeight=ROWS_HEIGHT[this.cols];
  category:string|undefined;
  products:Array<Product>|undefined;
  sort='desc';
  count='12';
  productsSubcription:Subscription|undefined;
  constructor(private cartService:CartService,private storeService:StoreService ) { }
  ngOnDestroy(): void {
    if(this.productsSubcription){
      this.productsSubcription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void{
    this.productsSubcription= this.storeService.getAllproducts(this.count,this.sort,this.category).subscribe((_products)=>{
      this.products=_products;
    })
  }
  onColumnsCountChange(colsNum:number):void{
    this.cols=colsNum;
    this.rowHeight=ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategorie:string):void{
    this.category=newCategorie;
    this.getProducts();
  }
  onItemsCountChange(newcount:number):void{
    this.count=newcount.toString();
    this.getProducts();

  }
  onSortChange(newsort:string):void {
    this.sort=newsort;
    this.getProducts();
  }
  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product:product.image,
      name:product.title,
      price:product.price,
      quantity:1,
      id:product.id
    })
  }
}

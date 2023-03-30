import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart=new BehaviorSubject<Cart>({items:[]});
  constructor(private _snackBar:MatSnackBar) { }
  addToCart(item:CartItem):void{
    const items=[...this.cart.value.items];
    const itemInCart=items.find((_item)=>_item.id===item.id);
    if(itemInCart){
      itemInCart.quantity+=1;
    }else{
      items.push(item);
    }
    this.cart.next({items});
    this._snackBar.open('1 item added to cart.','ok',{duration:3000});
  }
  getTotal(items:Array<CartItem>):number{
    return items.map((item)=>item.price*item.quantity).reduce((prev,current)=>prev+current,0);
  }
  OnClearCart():void{
    this.cart.next({items:[]});
    this._snackBar.open('cart cleared',"ok",{duration:3000});
  }
  RemoveFromCart(item:CartItem,update=true):Array<CartItem>{
    const filereditems=this.cart.value.items.filter((_item)=>_item.id!==item.id);
    if(update){
      this.cart.next({items:filereditems})
      this._snackBar.open("1 item removed","ok",{duration:3000});
    }
    return filereditems;
    
  }
  removeQuantity(item:CartItem):void{
    let itemForRemoval:CartItem|undefined;
    let filtereditems=this.cart.value.items.map((_item)=>{
      if(_item.id===item.id){
        _item.quantity--;
        if(_item.quantity===0){
          itemForRemoval=_item;;
        }
      }
      return _item;
    });
    if(itemForRemoval){
      filtereditems=this.RemoveFromCart(itemForRemoval,false);
    }
    this.cart.next({items:filtereditems})
    this._snackBar.open("1 item removed","ok",{duration:3000});
  }
  
}

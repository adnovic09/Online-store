import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Cart={items:[{
    product:"https://via.placeholder.com/150",
    name:"snicker",
    price:150,
    quantity:1,
    id:1,
  },
  {
    product:"https://via.placeholder.com/150",
    name:"shirt",
    price:160,
    quantity:2,
    id:2,
  }
]};
  dataSource:Array<CartItem>=[];
  displayedColumns:Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]


  constructor(private cartservice:CartService) { }

  ngOnInit(): void {
    
    this.cartservice.cart.subscribe((_cart:Cart)=>{
      this.cart=_cart;
      this.dataSource=this.cart.items;
    });
  }
  getTotal(items:Array<CartItem>):number{
    return items.map((item)=>item.price*item.quantity).reduce((prev,current)=>prev+current,0);
  }
  onClearCart():void{
    this.cartservice.OnClearCart();
  }
  onRemoveFromCart(item:CartItem):void{
    this.cartservice.RemoveFromCart(item);
  }
  onAddQuantity(item:CartItem):void{
    this.cartservice.addToCart(item);
  }
  onremoveQuantity(item:CartItem):void{
    this.cartservice.removeQuantity(item);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.moodel';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products :Array<Product> | undefined;
  constructor(private storeService: StoreService,private router:Router) {

   }

  ngOnInit(): void {
    this.getproductss();
  }
  private getproductss(){
    this.storeService.getAllPod().subscribe(data=>{
      this.Products=data;
    })
  }
  updateProduct(id:number){
    this.router.navigate(['update-Product',id])
  }
  deleteProduct(id:number){
    this.storeService.deleteEmployee(id).subscribe(data=>{
      this.getproductss();
    })
  }
  ajouterProduct(){
    this.router.navigate(['update-Product',5])

  }

}

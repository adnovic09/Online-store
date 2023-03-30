import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.moodel';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product!:Product;
  id!: number; 
  constructor(private storeService:StoreService,private route:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.storeService.getProductyId(this.id).subscribe(data=>{
      this.product=data;
    },
    error=>console.log(error));
  }
  onSubmit(){
   this.storeService.UpdateProduct(this.id,this.product).subscribe(data=>{
    }
    )
    this.goToproductList()
  }
  goToproductList(){
    this.router.navigate(['/user']);
  }
  

}

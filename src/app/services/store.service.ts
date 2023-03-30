import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.moodel';
const Store_Base_Url="http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class StoreService {
 

  constructor(private httpClinet: HttpClient) {}
   getAllproducts(limit='12',sort="desc",category?:string):Observable<Array<Product>>{
    return this.httpClinet.get<Array<Product>>(
      `${Store_Base_Url}/product${
        category?'/'+category:''
      }/${limit}/${sort}`
    )
   }
   getAllPod():Observable<Array<Product>>{
    return this.httpClinet.get<Array<Product>>(`${Store_Base_Url}/product`);
   }
   getProductyId(id:number):Observable<Product>{
    return this.httpClinet.get<Product>(`${Store_Base_Url}/product/${id}`)
  }
   getAllCategories():Observable<Array<string>>{
    return this.httpClinet.get<Array<string>>(
      `${Store_Base_Url}/products/categories`
    );
   }
   UpdateProduct(id:number,product:Product):Observable<Object>{
    return this.httpClinet.put(`${Store_Base_Url}/product/${id}`,product);
  }
   deleteEmployee(id: number) :Observable<Object>{
    return this.httpClinet.delete(`${Store_Base_Url}/product/${id}`);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { ProductBackEnd } from 'src/app/_model/productBackEnd';
import { AccountService } from 'src/app/_service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html'
})
export class ManageProductComponent implements OnInit {
  products?:ProductBackEnd[];

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getData();
  }



  getData(){
    this.accountService.readProductAll().subscribe((data)=>{
      this.products = data;
      console.log(this.products)
    })
  }

}

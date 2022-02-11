import { Component, OnInit } from '@angular/core';
import { CountProduct } from 'src/app/_model/count-product';
import { AccountService } from 'src/app/_service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html'
})
export class InfoProductComponent implements OnInit {
  countProduct?:CountProduct;

  constructor(private accountService:AccountService) { 
    this.accountService.getCountProduct().subscribe((count)=>{
      console.log(count);
      this.countProduct = count;
      console.log(this.countProduct?.Plasma_A);
    })
  }

  ngOnInit(): void {
    
  }
}

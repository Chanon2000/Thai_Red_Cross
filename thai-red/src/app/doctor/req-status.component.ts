import { Component, OnInit } from '@angular/core';
import { User } from '../_model';
import { OrderBlood } from '../_model/order-blood';
import { AccountService } from '../_service';

@Component({
  selector: 'app-req-status',
  templateUrl: './req-status.component.html'
})
export class ReqStatusComponent implements OnInit {
  user:User | null;
  orders?:OrderBlood[];
  // this.user?.Employee_ID

  constructor(private accountService:AccountService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.getData();
  }


  getData(){
    this.accountService.readOrderUserAll(this.user?.Employee_ID).subscribe((data)=>{
      this.orders = data;
      console.log(this.orders);
    })
  }

}

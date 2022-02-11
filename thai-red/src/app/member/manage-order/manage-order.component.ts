import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model';
import { OrderBlood } from 'src/app/_model/order-blood';
import { AccountService } from 'src/app/_service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html'
})
export class ManageOrderComponent implements OnInit {
  orders?:OrderBlood[];
  selectedOrderId?:number;
  user?:User | null;

  constructor(private accountService:AccountService, private alertService:AlertService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.getData();
  }



  getData(){
    this.accountService.readOrderWaiting().subscribe((data)=>{
      this.orders = data;
      console.log(this.orders);
    })
  }



  selectData(id:any){
    this.selectedOrderId = id;
    // console.log(this.selectedOrderId);
  }

  approveOrder(order:OrderBlood){
    order.Employee_ID =  this.user?.Employee_ID;
    console.log(order);
    this.accountService.approveOrderWaiting(order).subscribe((data)=>{
      console.log(data);
      if(data == "Pass"){
        // alert(data);
        console.log("Successfully approved");
        this.alertService.success("Successfully comfirm");
        this.getData();
      }else{
        this.alertService.error("ไม่สามารถอนุมัติคำขอได้ เนื่องจากมีส่วนประกอบโลหิตไม่พอ");
        // alert(data);
      }
    })
  }

  // cancelOrderWaiting
  cancelOrder(order:OrderBlood){
    this.accountService.cancelOrderWaiting(order).subscribe((data)=>{
      console.log(data);
      if(data == "Pass"){
        // alert(data);
        this.alertService.success("Successfully cancel");
        console.log("Successfully cancel");
        this.getData();
      }else{
        this.alertService.error("Error");
        // alert(data);
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_model';
import { AccountService } from '../_service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-req-order',
  templateUrl: './req-order.component.html'
})
export class ReqOrderComponent implements OnInit {

  reqOrderForm:FormGroup;//form
  submitted = false;//submitted
  user:User | null; // ต้องทำ

  constructor(private accountService:AccountService, private alertService:AlertService, private router:Router) { 
    this.user = this.accountService.userValue;
    
    this.reqOrderForm = new FormGroup({
      Order_ID: new FormControl(null),
      Employee_ID: new FormControl(''),
      Plasma_num: new FormControl('', [Validators.required]),
      BCs_num: new FormControl('', [Validators.required]),
      Platelets_num: new FormControl('', [Validators.required]),
      Order_date: new FormControl(null),
      Status: new FormControl(0),
      Endorser_ID: new FormControl(''),
      Bgroup: new FormControl('', [Validators.required])

    })

    this.reqOrderForm.setValue({
      Order_ID: null,
      Employee_ID: this.user?.Employee_ID,
      Plasma_num: null,
      BCs_num: null,
      Platelets_num: null,
      Order_date: null,
      Status: 0,
      Endorser_ID: null,
      Bgroup: null
    })
  }

  ngOnInit(): void {
  }


  get f(){
    return this.reqOrderForm.controls;
  }


  addOrder(){
    this.submitted = true;

    if(this.reqOrderForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }
    console.log(this.reqOrderForm.value);
    this.accountService.createOrder(this.reqOrderForm.value).subscribe(()=>{
      console.log("New record created successfully");
      this.alertService.success("New order created successfully");
      this.router.navigate(['/doctor/req-status'])
      // alert success
      // redirect ไปหน้าประวัติ
    }, (err)=>{
      this.alertService.error("Error");
      console.log("Error");
    })



  }

}

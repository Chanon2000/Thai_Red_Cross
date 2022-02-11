import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
  addProductForm:FormGroup;
  BBId:any;
  submitted = false;

  constructor(private accountService:AccountService, private router:Router, private activatedRoute:ActivatedRoute, private alertService:AlertService) { 

    this.BBId = this.activatedRoute.snapshot.paramMap.get('id');

    this.accountService.readBloodBById(this.BBId).subscribe(data => {
      this.addProductForm.setValue({
        Product_ID: null,
        Plasma: null,
        BCs: null,
        Platelets: null,
        Bgroup:data.Bgroup,
        BloodBag_ID:data.BloodBag_ID,
        volum: 75,
        Test_Status: 1,
        Status: null
      })
    })


    this.addProductForm = new FormGroup({
      Product_ID: new FormControl(''),
      Plasma: new FormControl('', [Validators.required]),
      BCs: new FormControl('', [Validators.required]),
      Platelets: new FormControl('', [Validators.required]),
      Bgroup: new FormControl('', [Validators.required]),
      BloodBag_ID: new FormControl(''),
      volum: new FormControl(''),
      Test_Status: new FormControl(''),
      Status: new FormControl('')
    })


  }

  ngOnInit(): void {
  }



  get f(){
    return this.addProductForm.controls;
  }


  addProduct(){
    this.submitted = true;
    if(this.addProductForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }
    console.log(this.addProductForm.value);
    this.accountService.addProduct(this.addProductForm.value).subscribe(()=>{
      console.log("New record created successfully");
      this.accountService.updateBBStatus(this.BBId).subscribe(()=>{
        console.log("New update successfully");
        this.alertService.success("New product created successfully");
        this.router.navigate(['/member/manage-bloodbag'])
      })
    }, (err)=>{
      this.alertService.error("Error");
      console.log("Error");
      // ถ้ามี error ควรมีอะไรแจ้งเตือน
    })

  }

}

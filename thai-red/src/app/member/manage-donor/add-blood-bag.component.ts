import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-add-blood-bag',
  templateUrl: './add-blood-bag.component.html'
})
export class AddBloodBagComponent implements OnInit {
  
  addBBForm:FormGroup;// form
  donorId:any;// id
  submitted = false;// submitted

  constructor(private accountService:AccountService, private router:Router, private activatedRoute:ActivatedRoute, private alertService:AlertService) { 
    // get by id เพื่อเอาไปเติมลง form
    this.donorId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.donorId);

    // setValue ลง form ใส่ลงไปแค่ id
    this.accountService.readDonorById(this.donorId).subscribe(data => {
      this.addBBForm.setValue({
        BloodBag_ID:null,
        PhleCode:null,
        DateofDonate:null,
        Bgroup:data.Bgroup,
        volum:null,
        Donor_ID:this.donorId,
        Test_Status:1,
        Status:null
      })
    })



    // สร้าง form ด้วย FormGroup
    this.addBBForm = new FormGroup({
      BloodBag_ID: new FormControl(''), // hidden เอาไว้
      PhleCode: new FormControl('', [Validators.required]),
      DateofDonate: new FormControl('', [Validators.required]),
      Bgroup: new FormControl(''),
      volum: new FormControl('', [Validators.required]),
      Donor_ID: new FormControl(''),
      Test_Status: new FormControl(''), // ใส่เอาไว้เลยให้เป็นผ่าน ( = 1)
      Status: new FormControl('') // hidden เอาไว้
    })

  }

  ngOnInit(): void {
    // console.log(this.addBBForm.value);
  }

  // สร้าง f
  get f(){
    return this.addBBForm.controls;
  }


  // addBloodBag() // ทำการ update status ของ Donor และ insert 1 BB
  addBloodBag(){
    this.submitted = true;
    if(this.addBBForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }

    console.log(this.addBBForm.value);
    this.accountService.addBloodBag(this.addBBForm.value).subscribe(()=>{
      console.log("New record created successfully");

      // insert ได้ ให้ update Status ของ Donor
      this.accountService.updateDonorStatus(this.donorId).subscribe(()=>{
        console.log("New update successfully");
        this.alertService.success("New blood bag created successfully");
        this.router.navigate(['/member/manage-donor'])
      })
      
    }, (err)=>{
      this.alertService.error("Error");
      console.log("Error"); //มี error ก็เลยมาทำตรงนี้ แต่errorนั้น ไม่ได้ทำให้insert หรือ update ไม่ได้
      // ถ้ามี error ควรมีแจ้งเตือน
    })

    


    
  }

}

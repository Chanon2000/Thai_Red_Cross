import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-edit-bloodbag-detail',
  templateUrl: './edit-bloodbag-detail.component.html'
})
export class EditBloodbagDetailComponent implements OnInit {

  editBBForm:FormGroup;// form
  BBId?:any;// id
  submitted = false;// submitted

  constructor(private accountService:AccountService, private router:Router, private activatedRoute:ActivatedRoute, private alertService:AlertService) { 
    this.BBId = this.activatedRoute.snapshot.paramMap.get('id');

    // get BB by id แล้ว setValue ลง form
    this.accountService.readBloodBById(this.BBId).subscribe((data) => {
      this.editBBForm.setValue({
        BloodBag_ID:data.BloodBag_ID,
        PhleCode:data.PhleCode,
        DateofDonate:data.DateofDonate,
        Bgroup:data.Bgroup,
        volum:data.volum,
        Test_Status:data.Test_Status,
        Donor_ID:data.Donor_ID,
        Status:data.Status
      })
    })





    // สร้าง form ด้วย FormGroup
    this.editBBForm = new FormGroup({
        BloodBag_ID: new FormControl(''), // hidden เอาไว้
        PhleCode: new FormControl('', [Validators.required]),
        DateofDonate: new FormControl('', [Validators.required]),
        Bgroup: new FormControl('', [Validators.required]),
        volum: new FormControl('', [Validators.required]),
        Test_Status: new FormControl('', [Validators.required]),
        Donor_ID: new FormControl('', [Validators.required]), // ใส่เอาไว้เลยให้เป็นผ่าน ( = 1)
        Status: new FormControl('') // hidden เอาไว้
    })



  }

  ngOnInit(): void {
  }


  // สร้าง f
  get f(){
    return this.editBBForm.controls;
  }



  // สร้าง update() 
  update(){

    this.submitted = true;
    if(this.editBBForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }
    this.accountService.updateBloodBag(this.editBBForm.value).subscribe(()=>{
      console.log("Successfully updated");
      this.alertService.success("Successfully updated");
      this.router.navigate(['/member/manage-bloodbag'])
    }, (err)=>{
      this.alertService.success("Error");
      console.log("Error");
      // ถ้ามี error ควรมีแจ้งเตือน
    })
  }

}

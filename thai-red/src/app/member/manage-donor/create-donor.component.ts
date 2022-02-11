import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Donor } from 'src/app/_model/donor';
import { AccountService } from 'src/app/_service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-create-donor',
  templateUrl: './create-donor.component.html'
})
export class CreateDonorComponent implements OnInit {
  createDonorForm:FormGroup;// form
  submitted = false;// submitted


  constructor(private accountService:AccountService, private router:Router, private alertService:AlertService) {
    // สร้าง form
    this.createDonorForm = new FormGroup({
      Donor_ID: new FormControl(''),
      NIN: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      Brithday: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      Cdisease: new FormControl('', [Validators.required]),
      Bgroup: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Career: new FormControl('', [Validators.required]),
      Status: new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  // f
  get f(){
    return this.createDonorForm.controls;
  }



  // onReset
  onReset(){
    this.submitted = false;
    this.createDonorForm.reset();
  }



  //onSubmit
  onSubmit(form:any){
    this.submitted = true;
    // console.log(form.value);
    if(this.createDonorForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }
    this.createDonorForm.value.firstName = this.createDonorForm.value.firstName.split(" ").join("");
    this.createDonorForm.value.lastName = this.createDonorForm.value.lastName.split(" ").join("");
    // console.log(form.value);
    this.accountService.createDonor(form.value).subscribe(()=>{
      // console.log(form.value);
      this.alertService.success("Add donor Successfully");
      this.router.navigate(['/member/manage-donor']);
    })
    
  }

}

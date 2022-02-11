import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_model';
import { AccountService } from '../_service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html'
})
export class RegisterRoleComponent implements OnInit {

  registerForm:FormGroup;
  submitted = false;

  constructor(private accountService:AccountService, private router:Router, private alertService:AlertService) { 
    this.registerForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Type_ID: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  get f(){
    return this.registerForm.controls;
  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }


  onSubmit(form:any){
    this.submitted = true;

    if(this.registerForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }

    console.log(form.value);
    this.accountService.register(form.value).subscribe(()=>{
      console.log(form.value);
      this.alertService.success("Register successful");
      this.router.navigate(['/member/edit-doctor'])
    }, (err)=>{
      this.alertService.error("Error");
      console.log("Error");
    })
    
  }

}

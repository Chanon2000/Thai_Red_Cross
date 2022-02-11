import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AccountService } from '../_service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;
  clickedAlert = false;

  constructor(private accountService:AccountService, private route:ActivatedRoute, private router:Router, private alertService:AlertService) { 
    this.loginForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // console.log(this.submitted);
  }

  get f(){
    return this.loginForm.controls;
  }

  onReset(){
    this.submitted = false;
    this.loginForm.reset();
  }

  onSubmit(form:any){
    this.submitted = true;

    if(this.loginForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }

    

    // console.log(form.value);
    // console.log(form.value.Username)
    // console.log(form.value.Password)
    this.accountService.login(form.value.Username, form.value.Password)
      .pipe(first())
      .subscribe({
          next: () => {
            console.log(form.value.Username)
            // เมื่อ login สำเร็จควรแจ้งแล้วจากนั้นก็ค่อย redirect
            this.alertService.success("Signed in successfully");
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          },
          error: error => {
            this.alertService.error("Username or password is incorrect");
          }

      });
  }

  showAlert() {
    this.clickedAlert = true;
  }


  removeAlert(){
    this.clickedAlert = false;
  }


}


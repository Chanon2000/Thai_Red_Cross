import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { User } from '../_model';
import { AccountService } from '../_service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  submitted = false;
  



  constructor(private accountService:AccountService, private router:Router) { 
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
      return;
    }


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, register it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'register!',
          'success'
        ),
        console.log(form.value);
        this.accountService.register(form.value).subscribe((employee:User)=>{
          
          // window.location.href = '../login';
          
        })
        console.log(form.value);
        this.router.navigate(['../login'])
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'back to register :)'
        )
      }
    })
  }

  
}

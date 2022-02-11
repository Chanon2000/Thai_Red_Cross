import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_model';
import { AccountService } from '../_service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User | null;
  profileForm:FormGroup;
  submitted = false;
  
  constructor(private accountService: AccountService, private alertService:AlertService) { 
    this.user = this.accountService.userValue; // เอาค่าที่เก็บใน localstorage มาเก็บลง user

    this.profileForm = new FormGroup({
      Employee_ID: new FormControl(''),
      Username: new FormControl(''),
      Password: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      // EmployeeName: new FormControl(this.f.firstName+" "+this.f.lastName),
      sex: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Type_ID: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
    });
    


    this.profileForm.setValue({
      Employee_ID:this.user?.Employee_ID,
      Username:this.user?.Username,
      Password:this.user?.Password,
      firstName:this.user?.firstName,
      lastName:this.user?.lastName,
      sex:this.user?.sex,
      Age:this.user?.Age,
      Address:this.user?.Address,
      PhoneNumber:this.user?.PhoneNumber,
      Type_ID:this.user?.Type_ID,
      StartDate:this.user?.StartDate,
    })
  }

  ngOnInit(): void {
    this.getData();
    
  }

  getData(){
    this.accountService.readEmp(this.user?.Employee_ID).subscribe((data:User)=>{
      this.user = data; // เป็น data จาก ฐานข้อมูล
      // console.log(this.user);
      
    });
  }


  // }

  get f(){
    return this.profileForm.controls;
  }

  onUpdate(){
    this.submitted = true;

    if(this.profileForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }
    this.profileForm.value.firstName = this.profileForm.value.firstName.split(" ").join("");
    this.profileForm.value.lastName = this.profileForm.value.lastName.split(" ").join("");
    // console.log(this.profileForm.value.firstName);



    // console.log(this.profileForm.value);
    this.accountService.updateEmp(this.profileForm.value).subscribe(()=>{
      console.log("Successfully updated");
      this.getData(); //ทำให้เมื่อ update สำเร็จจะไปเขียนทับใน localstorage ด้วย
      this.alertService.success("Update successful");
      // Update successful

    }, (err)=>{
      console.log("Error");
      this.alertService.error("Error");
    })
  }



}

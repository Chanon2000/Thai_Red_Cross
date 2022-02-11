import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_model';
import { AccountService } from '../_service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html'
})
export class EditDoctorComponent implements OnInit {

  users?:User[]; // เก็บค่า doctor ทั้งหมดที่ get มาจาก db

  constructor(private accountService:AccountService) { 
    
  }

  ngOnInit(): void {
    this.getData()
  }

  // get ข้อมูลจาก DB มาใส่ลง users
  getData(){
    this.accountService.readDocAll().subscribe((data)=>{
      this.users = data; //เอา หมอ ทั้งหมดที่getจากDB มาใส่ลง users
      console.log(this.users);
    })
  }

}

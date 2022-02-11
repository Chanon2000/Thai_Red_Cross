import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_model';
import { AccountService } from '../_service';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-edit-doctor-detail',
  templateUrl: './edit-doctor-detail.component.html'
})
export class EditDoctorDetailComponent implements OnInit {
  editDocForm:FormGroup;
  submitted = false;
  docId?:any;
  // submitted = false;
  // @Input() doctor?:User;
  // @Output() doctorChange = new EventEmitter<User>();
  

  constructor(private accountService:AccountService, private router:Router, private activatedRoute:ActivatedRoute, private alertService:AlertService) { 
    this.docId = this.activatedRoute.snapshot.paramMap.get('id');

    // get by id แล้วก็มาเติมลง form
    this.accountService.readEmp(this.docId).subscribe(data => {
      this.editDocForm.setValue({
        Employee_ID:data.Employee_ID,
        Username:data.Username,
        Password:data.Password,
        firstName:data.firstName,
        lastName:data.lastName,
        sex:data.sex,
        Age:data.Age,
        Address:data.Address,
        PhoneNumber:data.PhoneNumber,
        Type_ID:data.Type_ID,
        StartDate:data.StartDate
      })
    })
    this.editDocForm = new FormGroup({
      Employee_ID: new FormControl(''),
      Username: new FormControl(''),
      Password: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Type_ID: new FormControl(''),
      StartDate: new FormControl('', [Validators.required]),
    })

    
  }

  ngOnInit(): void {
  }

  get f(){
    return this.editDocForm.controls;
  }

  // เมื่อกดปุ่ม แก้ไข ที่ detail จะ เรียก updateEmp ที่ service โดยใส่ค่าformลงไป(this.editDocForm.value)
  update(){
    this.submitted = true;

    if(this.editDocForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }

    this.accountService.updateEmp(this.editDocForm.value).subscribe(()=>{
      console.log("Successfully updated");
      this.alertService.success("Update successful");
      this.router.navigate(['/member/edit-doctor'])
    }, (err)=>{
      this.alertService.error("Error");
      console.log("Error");
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-edit-donor-detail',
  templateUrl: './edit-donor-detail.component.html'
})
export class EditDonorDetailComponent implements OnInit {

  editDonorForm:FormGroup;// form
  DonorId?:any;// id
  submitted = false;// submitted

  constructor(private accountService:AccountService, private router:Router, private activatedRoute:ActivatedRoute, private alertService:AlertService) { 
    // get by id เพื่อเอาไปเติมลง form
    this.DonorId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.DonorId);


    // เรียก readEmp จาก service แล้ว setValue ลง form 
    this.accountService.readDonorById(this.DonorId).subscribe( data => {
      this.editDonorForm.setValue({
        Donor_ID:data.Donor_ID,
        NIN:data.NIN,
        firstName:data.firstName,
        lastName:data.lastName,
        Brithday:data.Brithday,
        sex:data.sex,
        Age:data.Age,
        Cdisease:data.Cdisease,
        Bgroup:data.Bgroup,
        weight:data.weight,
        Address:data.Address,
        PhoneNumber:data.PhoneNumber,
        Email:data.Email,
        Career:data.Career,
        Status:data.Status
      })
      // console.log(data.status);
    })


    // สร้าง form ด้วย FormGroup
    this.editDonorForm = new FormGroup({
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
      Status: new FormControl('', [Validators.required]),
    })


  }

  ngOnInit(): void {
  }



  // สร้าง f
  get f(){
    return this.editDonorForm.controls;
  }


  // สร้าง update() 
      // เมื่อกดปุ่ม แก้ไข ที่ detail จะ เรียก updateEmp ที่ service โดยใส่ค่าformลงไป(this.editDocForm.value)
  update(){
    this.submitted = true;

    if(this.editDonorForm.invalid){
      this.alertService.error("กรอกให้ครบทุกช่อง");
      return;
    }
    this.editDonorForm.value.firstName = this.editDonorForm.value.firstName.split(" ").join("");
    this.editDonorForm.value.lastName = this.editDonorForm.value.lastName.split(" ").join("");

    this.accountService.updateDonor(this.editDonorForm.value).subscribe(()=>{
      console.log("Successfully updated");
      this.alertService.success("Successfully updated");
      this.router.navigate(['/member/manage-donor'])
    }, (err)=>{
      console.log("Error");
      this.alertService.error("Error");
      // ถ้ามี error ควรมีแจ้งเตือน
    })
  }

}

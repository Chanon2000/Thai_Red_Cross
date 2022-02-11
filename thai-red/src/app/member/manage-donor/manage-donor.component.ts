import { Component, OnInit } from '@angular/core';
import { Donor } from 'src/app/_model/donor';
import { AccountService } from 'src/app/_service';

@Component({
  selector: 'app-manage-donor',
  templateUrl: './manage-donor.component.html'
})
export class ManageDonorComponent implements OnInit {
  donors?:Donor[];// เก็บข้อมูล donor เป็น array เพื่อเอาไปวนลูปในตาราง 

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getData();
  }


  // get donor All ลงตาราง (เฉพาะ status=1 (นั้นคือยังไม่ได้ถูกแยก))
  getData(){
    this.accountService.readDonorAll().subscribe((data)=>{
      this.donors = data;
      console.log(this.donors)
    })
  }


  // 

}

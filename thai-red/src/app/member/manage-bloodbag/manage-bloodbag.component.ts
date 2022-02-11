import { Component, OnInit } from '@angular/core';
import { BloodBag } from 'src/app/_model/bloodbag';
import { AccountService } from 'src/app/_service';

@Component({
  selector: 'app-manage-bloodbag',
  templateUrl: './manage-bloodbag.component.html'
})
export class ManageBloodbagComponent implements OnInit {
  bloodbags?:BloodBag[];// array เก็บ bloodbag 
  //
  // name?: string;

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    // สั่ง getData()
    this.getData();
  }


  // getData() //สร้าง service readbloodbag()
  getData(){
    this.accountService.readbloodbagAll().subscribe((data)=>{
      this.bloodbags = data;
      console.log(this.bloodbags);
    })
  }


  // getDonorName(){
  //   if(!this.bloodbags){
  //     return;
  //   }
    
  //   for(let i of this.bloodbags){
  //     this.accountService.readDonorById(i.Donor_ID).subscribe((data)=>{
  //       this.name = data.firstName;
  //       console.log(this.name);
  //       return true;
  //     })
  //   }
    
  // }

}

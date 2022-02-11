import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent implements OnInit {

  constructor(private router:Router, private accountService:AccountService) { 
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
      console.log("ทำการเร้าไปที่ / โดย layout: ดังนั้นคุณจะเห็นหน้า edit Profile");
    }
    
  }

  ngOnInit(): void {
  }

}

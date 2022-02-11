import { Component } from '@angular/core';
import { User } from './_model';
import { AccountService } from './_service';
import { Role } from './_model/role';
import { AlertService } from './_service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thai-red';
  user?: User | null;
  role?: Role;

  constructor(private accountService: AccountService, private alertService:AlertService, private router:Router) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  // get isMember(){
  //   return this.accountSe
  // }


  logout(){
    this.accountService.logout();
    this.alertService.success("Successful logout")
    this.router.navigateByUrl("/account/login");
  }



}

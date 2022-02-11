import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../_model';
import { AccountService } from '../_service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private accountService: AccountService){
    
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const user = this.accountService.userValue;
    if (!user) {
      console.log("user คือ "+user);
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    const roles = route.data.roles;
    // let type_id: Role[] 
    // type_id[0] = this.accountService.userValue?.Type_ID;
    // console.log(route.data);
    // console.log(route.data.roles);
    // console.log(roles);
    // console.log(this.accountService.userValue?.Type_ID);
    if(roles && !this.accountService.userValue?.Type_ID === roles){
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
      console.log("ทำการเร้าไปที่ /account/login เพราะ Type_ID ไม่ตรงกับ roles");
      return false;
    }


    
    // console.log("in canActivate")
    return true;
  }
  
}

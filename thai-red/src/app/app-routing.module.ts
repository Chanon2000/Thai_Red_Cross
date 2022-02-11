import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
// import { MemberModule } from './member/member.module';
// import { AccountModule } from './account/account.module';
import { AuthGuard } from './_helpers';
import { Role } from './_model/role';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const memberModule = () => import('./member/member.module').then(x => x.MemberModule);
const doctorModule = () => import('./doctor/doctor.module').then(x => x.DoctorModule);

const routes: Routes = [
  {path:'', component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'member', loadChildren:memberModule, canActivate: [AuthGuard], data: {roles: [Role.Member]}},
  {path:'doctor', loadChildren:doctorModule, canActivate: [AuthGuard], data: {roles: [Role.Doctor]}},
  {path:'account', loadChildren:accountModule},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

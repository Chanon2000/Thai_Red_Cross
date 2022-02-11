import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReqOrderComponent } from './req-order.component';
import { ReqStatusComponent } from './req-status.component';

const routes: Routes = [
  { path: 'req-order', component:ReqOrderComponent },
  { path: 'req-status', component:ReqStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

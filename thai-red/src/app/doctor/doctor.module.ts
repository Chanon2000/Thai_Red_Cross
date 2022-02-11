import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ReqOrderComponent } from './req-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReqStatusComponent } from './req-status.component';


@NgModule({
  declarations: [ReqOrderComponent, ReqStatusComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule
  ]
})
export class DoctorModule { }

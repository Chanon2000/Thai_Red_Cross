import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { EditDoctorComponent } from './edit-doctor.component';
import { LayoutComponent } from './layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDoctorDetailComponent } from './edit-doctor-detail.component';
import { ManageDonorComponent } from './manage-donor/manage-donor.component';
import { EditDonorDetailComponent } from './manage-donor/edit-donor-detail.component';
import { AddBloodBagComponent } from './manage-donor/add-blood-bag.component';
import { CreateDonorComponent } from './manage-donor/create-donor.component';
import { ManageBloodbagComponent } from './manage-bloodbag/manage-bloodbag.component';
import { EditBloodbagDetailComponent } from './manage-bloodbag/edit-bloodbag-detail.component';
import { AddProductComponent } from './manage-bloodbag/add-product.component';
import { InfoProductComponent } from './info-product/info-product.component';
import { ManageProductComponent } from './info-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { RegisterRoleComponent } from './register-role.component';


@NgModule({
  declarations: [EditDoctorComponent, LayoutComponent, EditDoctorDetailComponent, ManageDonorComponent, EditDonorDetailComponent, AddBloodBagComponent, CreateDonorComponent, ManageBloodbagComponent, EditBloodbagDetailComponent, AddProductComponent, InfoProductComponent, ManageProductComponent, ManageOrderComponent, RegisterRoleComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule
  ]
})
export class MemberModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDoctorDetailComponent } from './edit-doctor-detail.component';
import { EditDoctorComponent } from './edit-doctor.component';
import { InfoProductComponent } from './info-product/info-product.component';
import { ManageProductComponent } from './info-product/manage-product.component';
import { LayoutComponent } from './layout.component';
import { AddProductComponent } from './manage-bloodbag/add-product.component';
import { EditBloodbagDetailComponent } from './manage-bloodbag/edit-bloodbag-detail.component';
import { ManageBloodbagComponent } from './manage-bloodbag/manage-bloodbag.component';
import { AddBloodBagComponent } from './manage-donor/add-blood-bag.component';
import { CreateDonorComponent } from './manage-donor/create-donor.component';
import { EditDonorDetailComponent } from './manage-donor/edit-donor-detail.component';
import { ManageDonorComponent } from './manage-donor/manage-donor.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { RegisterRoleComponent } from './register-role.component';

const routes: Routes = [
  {
    path:'',component: LayoutComponent,
    children: [
      { path: 'edit-doctor',component: EditDoctorComponent},
      { path: 'edit-doctor/:id', component:EditDoctorDetailComponent},
      { path: 'manage-donor', component:ManageDonorComponent},
      { path: 'edit-donor/:id', component:EditDonorDetailComponent},
      { path: 'add-blood-bag/:id', component:AddBloodBagComponent},
      { path: 'create-donor', component:CreateDonorComponent},
      { path: 'manage-bloodbag', component:ManageBloodbagComponent},
      { path: 'edit-bloodbag/:id', component:EditBloodbagDetailComponent},
      { path: 'add-product/:id', component:AddProductComponent},
      { path: 'info-product', component:InfoProductComponent},
      { path: 'manage-product', component:ManageProductComponent},
      { path: 'manage-order', component:ManageOrderComponent},
      { path: 'register-role', component:RegisterRoleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }

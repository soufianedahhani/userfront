import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    SharedModule,

  ]
})
export class UsersModule { }

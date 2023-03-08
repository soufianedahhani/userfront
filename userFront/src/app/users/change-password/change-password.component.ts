import { Component, OnInit } from '@angular/core';
import {PasswordRequest} from "../../shared/model/password-request";
import {UserService} from "../../shared/services/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password= new PasswordRequest();

  constructor( private userService: UserService,
               private messageService:MessageService,
               ) { }

  ngOnInit(): void {

    const currentUser=localStorage.getItem('currentUser');
    const user=JSON.parse(currentUser ? currentUser:'');
    this.password.id=user.id;
  }

  changePassword(): void{
      this.userService.changePassword(this.password).subscribe(data => {

      if(data.success){
        location.reload();
        this.password= new PasswordRequest();
        this.messageService.add({severity:'success',
          summary:data.message,
          detail:data.detail});
      }
      else {
        this.messageService.add({
          severity: 'warn',
          summary: data.message,
          detail: data.detail
        });
      }
    },ex=>
    {
      this.messageService.add(
        {severity:'error',
          summary:'Error',
          detail:'Operation non effectuée'});
      console.log(ex)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {Users} from "../../shared/model/users";
import {UserService} from "../../shared/services/user.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  user=new Users();
  confirmPwd:any;
  idUser:any;

  constructor(private userService : UserService,
              private messageService:MessageService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.idUser=this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(this.idUser);
    if(this.idUser){
     this.getUserById();

    }
  }
getUserById() : void {
  this.userService.getById(this.idUser).subscribe(res => {
    this.user = res;
  }, ex => console.log(ex));
}

editUser() : void{
    this.userService.update(this.user).subscribe(data => {

      if(data.success){
        this.router.navigate(['/users/list']);
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

  addUser() : void{
    this.userService.add(this.user).subscribe(data => {

      if(data.success){
        this.router.navigate(['/users/list']);
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
  valider(): void  {

    if(this.idUser){
      this.editUser();
    } else {
      this.addUser();
    }
  }
  annuler() : void {

    if(this.idUser){
      this.getUserById();
}
}
}

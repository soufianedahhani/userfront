import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../shared/services/user.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Users} from "../shared/model/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
 users:Users[];
  constructor(private httpClient: HttpClient,
              private userService :UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    }, ex => console.log(ex));
  }


  removeUser(id:number): void{
      this.confirmationService.confirm({
        message: 'Vous etes sur de supprimer',
        accept: () => {


          this.userService.delete(id).subscribe(data  =>{
            console.log(data);
            if(data.success){
            this.getAll();
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
            }

          );
        }
      });
  }
}

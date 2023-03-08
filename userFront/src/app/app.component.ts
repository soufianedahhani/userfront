import {Component, OnInit} from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{


  constructor (private  permissionservice: NgxPermissionsService){}

  ngOnInit(): void {

    const token=localStorage.getItem('token');
    const jwtHelper =new JwtHelperService();
    if(token &&  !jwtHelper.isTokenExpired(token)) {

      const decodeToken = jwtHelper.decodeToken(token);
      const roles=decodeToken.roles;
     // if (roles.include('ROLE_ADMIN')){
      this.permissionservice.loadPermissions(roles);


      }

  }

  logout(): void {

    localStorage.clear();
    location.reload();
  }


}

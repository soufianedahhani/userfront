import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { from, Observable } from 'rxjs'
import {environment} from "../../../environments/environment";
import {Contact} from "../model/contact";
import {Users} from "../model/users";
import {PasswordRequest} from "../model/password-request";



@Injectable({
  providedIn: 'root'
})
export class UserService {
 private url=environment.apiUrl + '/users';
  constructor(private httpClient:HttpClient) { }

  public getAll():Observable<Users[]>{
    return this.httpClient.get<Users[]>(this.url);
  }

  public delete(id: number): Observable<any> {

    return this.httpClient.delete(this.url + '/' + id);
  }

  public getById(id: any): Observable<Users> {

    return this.httpClient.get<Users>(this.url + '/' + id);
  }

  public add(user: Users): Observable<any> {

    return this.httpClient.post(this.url ,user);
  }

  public update(user: Users): Observable<any> {

    return this.httpClient.put(this.url ,user);
  }

  public changePassword(password :PasswordRequest): Observable<any> {

    return this.httpClient.patch(this.url ,password);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({providedIn: 'root'})
export class AuthService
{

  private token: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog){}

  getToken(){
    return this.token;
  }

  createUser(username: string, email: string, password: string){
    const authData: Auth =
    {
      username: username,
      email: email,
      password: password,
    };

    this.http.post<{message: string}>('https://localhost:3000/user/signup', authData)
    .subscribe((response)=>{
        this.dialog.open(SuccessComponent, {data:{message:response.message}});
    });
  }

  login(username: string, email: string, password: string){
    const authData: Auth =
    {
      username: username,
      email: email,
      password: password
    };

    this.http.post<{token: string, message: string}>('https://localhost:3000/user/login', authData)
    .subscribe((response) => {
      const token = response.token;
      this.token = token;
      console.log(response);
      this.dialog.open(SuccessComponent, {data:{message:response.message}});

    });
  }

}


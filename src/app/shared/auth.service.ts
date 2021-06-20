import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService{
  readonly baseURL = 'https://localhost:3000/users'
}

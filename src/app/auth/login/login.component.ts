import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  enteredUserNameError = 'Please enter a username in the correct format';
  enteredEmailError = 'Please enter a valid email address';
  enteredPasswordError = 'Please enter the password in the correct format';

  ngOnInit(): void {

  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.enteredUserName, form.value.enteredEmail, form.value.enteredPassword);
    console.log(form.value);
  }

}

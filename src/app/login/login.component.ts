import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  enteredEmailError = 'Please enter a correctly formatted e-mail addresss ';
  enteredPasswordError = 'Please enter a password that contains lower case,' +
    'upper case letters and at least one number';

  ngOnInit(): void {

  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
  }

}

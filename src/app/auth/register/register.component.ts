import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  enteredUserNameError = 'Please enter a user name in the correct form';
  enteredEmailError = 'Please enter a correctly formatted e-mail addresss ';
  enteredPasswordError = 'Please enter a password that contains lower case,' +
    'upper case letters and at least one number';

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.enteredUserName, form.value.enteredEmail, form.value.enteredPassword);
  }

}

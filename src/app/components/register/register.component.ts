import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  post: any;
  name: string;
  email: string;
  mobile: number;
  password: any;
  confirmPassword: any;
  registrationShow = true;
  responseStatus = {status: String, msg: String};

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, Validators.email],
      'mobile': [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmPassword': [null, Validators.required]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  ngOnInit() {
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors( {mismatchedPasswords: true} );
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

  onRegister(user: IUser): void {
    this.auth.register({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      confirmPassword: user.confirmPassword})
      .subscribe(
        data => {
          this.responseStatus = data;
          if (data.status === 'success') {
            this.router.navigate(['/login']);
          }
        },
        err => console.log(err)
      );
  }
}

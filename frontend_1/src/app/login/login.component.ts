import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: LoginService, private router: Router) {}

  data: any;

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {}

  Login() {
    console.log(this.loginform.value);
    this.auth.login(this.loginform.value).subscribe((success: any) => {
      console.log('login done successfully');
      let data = success;
      window.alert('login succesfully');
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id);
      this.router.navigate(['contactlist']);
    });
  }
}

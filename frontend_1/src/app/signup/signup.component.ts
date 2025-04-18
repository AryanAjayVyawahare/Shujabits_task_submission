import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private auth:LoginService, private router:Router) { }

  signupform=new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("",[Validators.required, Validators.email] ),
    
    password: new FormControl ("",[Validators.required,Validators.minLength(8)]),
    confirmpassword: new FormControl("",[Validators.required,Validators.minLength(8)])

   })

  ngOnInit(): void {
  }
  
Singup(){
  console.log("register value", this.signupform.value);
  this.auth.signup(this.signupform.value).subscribe((success:any)=>{
    console.log("Registered successfully", success)
    this.router.navigate(['login'])
  })


}

}

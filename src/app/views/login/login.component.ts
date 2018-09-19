import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  loginForm: FormGroup;
  notExist;
  error;
  value;

  constructor(
    private formBuild: FormBuilder,
    private route: Router,
    private authServ: AuthServiceService
  ) { }

  ngOnInit() {
    this.loginFun();
  }

  loginFun(){
    this.loginForm = this.formBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.maxLength(50), 
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])]
    })
  }

  submit(){
    console.log(this.loginForm.value)
    this.authServ.login(this.loginForm.value)
    .then((res: any) => {
      if(res.status == 200){
        console.log(res.data.results[0].token);
        window.alert('User Successfully LoggedIN');
        localStorage.setItem('Token', res.data.results[0].email);
        this.authServ.updateUserStatus(res.data.results[0].id)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
        this.route.navigate(['/dashboard']);
      }else{
        this.notExist = "Invalid email or password";
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  forgotPass(){
    this.route.navigate(['/forgotpassword']);
  }

  regPage(){
    this.route.navigate(['/register']);
  }
}

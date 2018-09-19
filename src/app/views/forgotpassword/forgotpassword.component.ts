import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormsModule} from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotGroup: FormGroup;
  otpGroup: FormGroup;
  passGroup: FormGroup;
  user = {};
  data = {};
  value = {};
  email;
  otpKey;
  notExist;
  emailID;
  invalidOTP;
  confirmpassword;

  constructor(
    private formBuild: FormBuilder, 
    private authServ: AuthServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    
    this.forgotGroup = this.formBuild.group({

      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), 
      Validators.minLength(2), Validators.maxLength(30)])]
    });
    
    this.otpGroup = this.formBuild.group({

      otp: ['', Validators.compose([Validators.required])]
    });
    
    this.passGroup = this.formBuild.group({

      newpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  
  forgotEmail(){
    this.emailID = this.forgotGroup.value.email;
    this.authServ.forgot(this.forgotGroup.value)
    .then((data: any) => {
      if(data.data.results.affectedRows > 0){
        window.alert('OTP Generated Successfully');
        this.email = this.forgotGroup.value;
      }else{
        this.notExist = "Invalid email";
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  otpFun(){
    this.otpGroup.value.email = this.emailID;
    this.authServ.otpCheck(this.otpGroup.value)
    .then((data: any) => {
      if(data.status == 200){
        window.alert('OTP Verified Successfully');
        this.otpKey = this.otpGroup.value;
      }else{
        this.invalidOTP = "Invalid OTP";
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  newPass(){
    if(this.passGroup.value.newpassword === this.passGroup.value.confirmpassword){
    this.passGroup.value.email = this.emailID;
    this.authServ.newPassword(this.passGroup.value)
    .then((data: any) => {
      window.alert('Password Updated Successfully');
      this.route.navigate(['/login']);
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    this.confirmpassword = 'Incorrect';
  }
  }

  regPage(){
    this.route.navigate(['/register']);
  }

}

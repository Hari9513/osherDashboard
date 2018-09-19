import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  emailAlreadyExist;
  emailNotExist;
  phoneAlreadyExist;
  phoneNotExist;

  constructor(
    private formBuild: FormBuilder,
    private route: Router,
    private authServ: AuthServiceService
  ) {
    
   }
  ngOnInit() {
    this.registrationFun();
  }

  registrationFun(){
    this.registrationForm = this.formBuild.group({
      tempData: this.formBuild.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
      roles: ['', Validators.compose([Validators.required])]
      // setAvailableMenus: ['', Validators.compose([Validators.required])]
    }),
    regArray: this.formBuild.array([])
  })
  }

  register(){
    console.log(this.registrationForm.value);
    const regArrayData = this.registrationForm.get('regArray') as FormArray;
    regArrayData.value.push(this.registrationForm.get('tempData').value);
    const userData = regArrayData.value;

    this.authServ.registerUser(userData[0])
    .then(res => {
      if(res){
        this.route.navigate(['/customers']);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  loginPage(){
    this.route.navigate(['/login']);
  }

  emailExist(data){
    if(data.tempData.email){
      this.authServ.emailExist(data.tempData)
      .then((data: any) => {
        if(data.results.length){
          this.emailAlreadyExist = 'Email Address is Already Exist. Login to Continue';
        } else {
          this.emailAlreadyExist = '';
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
    
  phoneExist(data){
    if(data.tempData.phone){
      this.authServ.phoneExist(data.tempData)
      .then((data: any) => {
        if(data.results.length){
          this.phoneAlreadyExist = 'Phone Number Already Exist. Enter new number.';
        } else {
          this.phoneAlreadyExist = '';
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

}

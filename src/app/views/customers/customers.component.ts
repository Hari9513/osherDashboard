import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  allCustomers;

  constructor(
    private authServ: AuthServiceService
  ) { }

  ngOnInit() {
    this.authServ.getUserDetails()
    .then((data: any) => {
      this.allCustomers = data;
    })
    .catch(err => {
      console.log(err);
    })
  }

}

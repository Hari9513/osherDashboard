import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.scss']
})
export class DashboardUsersComponent implements OnInit {
  allUsers: any;

  constructor(
    private authServ: AuthServiceService
  ) { }

  ngOnInit() {
    this.authServ.getDashboardUserDetails()
    .then((data: any) => {
      this.allUsers = data;
    })
    .catch(err => {
      console.log(err);
    })
  }

}

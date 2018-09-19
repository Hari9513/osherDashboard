import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.scss']
})
export class CouponCodeComponent implements OnInit {
  value;
  couponamount: any;
  coupon: any;
  couponDatas: any;
  modalRef: BsModalRef;
  ;

  constructor(
    private authServ: AuthServiceService,
    private modalService: BsModalService
  ) { }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.authServ.getCouponDetails()
      .then((data: any) => {
        console.log(data)
        this.couponDatas = data.results;
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChange() {
    console.log(this.value)
    if (this.value) {
      if (this.value == 1000) {
        this.couponDatas = this.couponDatas.filter(data => {
          return data.couponamount == this.value;
        })
      } else if (this.value == 200) {
        this.couponDatas = this.couponDatas.filter(data => {
          return data.couponamount == this.value;
        })
      } else {
        this.couponDatas = this.couponDatas.filter(data => {
          return data.couponamount == this.value;
        })
      }
    }
  }

  generate() {
    // console.log('Working', this.couponamount);
    if (this.couponamount) {
      this.coupon = {
        couponamount: this.couponamount
      }
      this.authServ.generateCoupon(this.coupon)
        .then(data => {
          console.log(data)
          window.alert('Coupon Amount and Code Generated');
          this.ngOnInit();
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}

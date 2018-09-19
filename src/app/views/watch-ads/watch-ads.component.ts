import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-watch-ads',
  templateUrl: './watch-ads.component.html',
  styleUrls: ['./watch-ads.component.scss']
})
export class WatchAdsComponent implements OnInit {
  allProducts;
  turnStatus;
  videos;
  images;
  checkBox;
  videoValues;
    public largeModal;
    value: any;
  form: FormGroup;
  selectedValue;
  statusArray = [];
  checkBoxValues: any;
  separateCheckBoxValues: any;
  constructor(
    private authServ: AuthServiceService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (localStorage.getItem('Token')) {
      console.log('Auth Verified');
      this.authServ.getAllStocks()
      .then((data: any) => {
        var stockArray = data.results; 
        stockArray.map(data => {
          if(data.status === 0){
            data.status = false;
          } else {
            data.status = true;
          }
          return data;
        })
        this.allProducts = stockArray;
      });
    } else {
      this.route.navigate(['/login']);
    }

    this.turnStatus = [];
    this.formFun();
  }

  formFun(){
    this.form = this.fb.group({
      value: [''],
      allStatus: ['']
    })
  }

  onClick(values, rowValue) {
    this.checkBoxValues = values;
    if (values == 'allValues') {
      this.form.value.value = true;
      this.allProducts.map(products => {
        if (this.form.value.allStatus == true) {
          this.checkBox = true;
        } else {
          this.checkBox = false;
        }
      })
    } else {
      if (this.form.value.value == true) {
        this.turnStatus.push(rowValue);
        this.separateCheckBoxValues = this.turnStatus;
      } else {
        var remove = this.turnStatus;
        this.separateCheckBoxValues = remove.filter(value => {
          return rowValue.ID !== value.ID
        })
        console.log('Not Selected', this.separateCheckBoxValues, rowValue);
      }
    }
  }

  onStocks() {
    if (this.checkBoxValues == 'allValues') {
      var onStocksValue = this.allProducts;
      onStocksValue.map(products => {
        products.status = 1;
      })
    } else {
      var onStocksValue = this.separateCheckBoxValues;
      onStocksValue.map(separateProducts => {
        separateProducts.status = 1;
      })
    }
    if (onStocksValue) {
      this.authServ.updateStockStatus(onStocksValue)
        .then(data => {
          window.alert('Stocks are Turn ON');
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  offStocks() {
    if (this.checkBoxValues == 'allValues') {
      var offStocksValue = this.allProducts;
      offStocksValue.map(products => {
        products.status = 0;
      })
    } else {
      var offStocksValue = this.separateCheckBoxValues;
      offStocksValue.map(separateProducts => {
        separateProducts.status = 0;
      })
    }
    if (offStocksValue) {
      this.authServ.updateStockStatus(offStocksValue)
        .then(data => {
          window.alert('Stocks are Turn OFF');
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  checkValues(value, products){
    if(value.value == true){
    console.log(value, products)
  }
}

  switch(data, product){
    if(data == true){
    product.status = 1;
    } else {
    product.status = 0;
    }
    this.authServ.updateStockStatus(product)
    .then(data => {
      window.alert('Stock Status Updated');
      this.ngOnInit();
    })
    .catch(error => {
      console.log(error);
    })
  }

  check(data){
    console.log(data);
  }

  openDialog(){
    this.route.navigate(['/watchAds/modals']);
  }

  videoTag(data){
    console.log(data.filetype);
    if(data.filetype == 'image/jpeg'){
    this.images = data.video;
    } else if(data.filetype == 'video/mp4'){
    this.videos = data.video;
    } else {
      window.alert('File Type is invalid');
    }
  }
}

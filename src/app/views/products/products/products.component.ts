import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
// export class ModalsComponent {
//     public myModal;
// }
export class ProductsComponent {
  [x: string]: any;
  public myModal;
  allProducts;
  turnStatus;
  videos;
  images;
  checkBox;
  videoValues;
  public largeModal;
  authEmailID
  value: any;
  form: FormGroup;
  selectedValue;
  statusArray = [];
  checkBoxValues;
  separateCheckBoxValues;
  loginForm: any;
  notExist: string;
  authentication;
  modalRef: BsModalRef;
 

  constructor(
    private route: Router,
    private authServ: AuthServiceService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.authEmailID = localStorage.getItem('Token');
    if (localStorage.getItem('Token')) {
      console.log('Auth Verified');
      this.authServ.getAllStocks()
        .then((data: any) => {
          this.allProducts = data.results;
        });
    } else {
      this.route.navigate(['/login']);
    }
    this.turnStatus = [];
    this.formFun();
  }

  addStock() {
    this.route.navigate(['/addStock']);
  }
  

  formFun() {
    this.form = this.fb.group({
      value: [''],
      allStatus: [''],
      password: ['']
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

  deleteStock(value, id) {
    this.authentication = value;
    console.log(id);
    this.deleteStockID = {id};
  }

  deleteValue(){
    console.log(this.deleteStockID);
    if(this.form.value.password){
      this.form.value.email = this.authEmailID;
      console.log(this.form.value);
    this.authServ.login(this.form.value)
    .then((res: any) => {
      if(res.status == 200){
        console.log(res.data.results[0].token);
        window.alert('Password Matched');
        if(this.authentication == 'delete'){
        this.authServ.deleteStock(this.deleteStockID)
          .then((res: any) => {
            window.alert('Stock Details get Deleted');
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          })
        } else if (this.authentication == 'OnStock'){
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
        } else {
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
      }else{
        this.notExist = "Invalid email or password";
      }
    })
    .catch(error => {
      console.log(error);
    })
    }
  }
  
  onStocks(value) {
    this.authentication = value;
  }

  offStocks(value) {
    this.authentication = value;
  }

  checkValues(value, products) {
    if (value.value == true) {
      console.log(value, products)
    }
  }

  switch(data, product) {
    if (data == true) {
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
// callInterval() {
//   setInterval (() => {
//     console.log("Hello from setInterval");
//   }, 5000)
// }
}

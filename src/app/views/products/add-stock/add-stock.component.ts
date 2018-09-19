import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  addStockGroup: FormGroup;
  fileSize;
  fileName;
  fileType;

  constructor(
    private formBuild: FormBuilder,
    private authServ: AuthServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('Token')){
      console.log('Auth Verified');
    } else {
      this.route.navigate(['/login']);
    }
    this.stockFun();
  }

  stockFun() {
    this.addStockGroup = this.formBuild.group({
      stock_name: ['', Validators.compose([Validators.required])],
      stock_quantity: ['', Validators.compose([Validators.required])],
      stock_price: ['', Validators.compose([Validators.required])],
      stock_brokerage: ['', Validators.compose([Validators.required])]
    });
  }


  uploadVideo(files: File[]) {
    if (files.length) {
      console.log(files);
      const [file] = files;
      this.fileSize = (file.size / (1024 * 1024)).toFixed(2);
      this.fileType = file.type;
      var fd = new FormData();
      fd.append('file', file);
      this.authServ.upload(fd)
        .then((data: any) => {
          this.fileName = data.fileName;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  addStock() {
    if (this.addStockGroup.value) {
      this.addStockGroup.value.fileName = this.fileName;
      this.addStockGroup.value.fileSize = this.fileSize;
      this.addStockGroup.value.fileType = this.fileType;
      this.authServ.addStock(this.addStockGroup.value)
        .then((data: any) => {
          if (data) {
            window.alert('Stock Added');
            this.route.navigate(['/products']);
          } else {
            window.alert('Somthing went Wrong');
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }


  cancel() {
    this.route.navigate(['/products']);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';


@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss']
})
export class ViewStockComponent implements OnInit {
  id: any;
  viewStockGroup : FormGroup;
  stockData;
  fileSize;
  fileName;
  fileType;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuild: FormBuilder,
    private authServ: AuthServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.ID;
    this.authServ.getStockByID(this.id)
    .then((data: any) => {
      this.stockData = data.results[0];
      this.viewStockGroup.patchValue(this.stockData);
    });
    this.stockFun();
  }

  stockFun() {
    this.viewStockGroup = this.formBuild.group({
      stock_name: ['', Validators.compose([Validators.required])],
      stock_quantity: ['', Validators.compose([Validators.required])],
      stock_price: ['', Validators.compose([Validators.required])],
      stock_brokerage: ['', Validators.compose([Validators.required])]
    });
  }
  
  uploadVideo(files: File[]) {
    if (files.length) {
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
  
  updateStock() {
    if (this.viewStockGroup.value) {
      this.viewStockGroup.value.ID = this.id;
      if(this.fileName && this.fileSize && this.fileType){
      this.viewStockGroup.value.fileName = this.fileName;
      this.viewStockGroup.value.fileSize = this.fileSize;
      this.viewStockGroup.value.fileType = this.fileType;
      } else {
        this.viewStockGroup.value.fileName = this.stockData.video;
        this.viewStockGroup.value.fileSize = this.stockData.fileSize;
        this.viewStockGroup.value.fileType = this.stockData.fileType;
      }
      this.authServ.updateStockByID(this.viewStockGroup.value)
        .then((data: any) => {
          if (data) {
            window.alert('Stock Updated');
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

  cancel(){
    this.route.navigate(['/products']);
  }

}

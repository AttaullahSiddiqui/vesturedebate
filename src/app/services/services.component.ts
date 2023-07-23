import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  couponsArray: Array<any> = [];
  storePic: any = null;
  storeThumb = null;
  storeDetail: any;
  longDes = null;
  storeName: any = null;
  storeName2: any = null;
  storeURL: string = '';
  storeURLToShow: any = '';
  storeId: any;
  storeDate: any;
  codeCopied = false;
  editObj: any;
  storeArray: [] = [];
  productsArray: [] = [];
  banners = [];
  postImages = [];
  isBusy: boolean = false;
  isFetchingStores: boolean = false;
  isFetchingProducts: boolean = false;
  mobile: boolean = false;
  backUpForStores = null;
  monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  smallScreen: Boolean = false;
  currentDate = Date.now();

  constructor(
    private route: ActivatedRoute,
    private _dataService: DataService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (window.screen.width < 830) this.smallScreen = true;
    if (window.screen.width < 450) this.mobile = true;
    this.loadFeaturedCoupons();
  }
  loadFeaturedCoupons() {
    if (this.isBusy) return;
    this.isBusy = true;
    this._dataService
      .fetchAPI('/userDisplay/fetchFeaturedCoupons')
      .subscribe((res) => {
        if (res.data) {
          this.couponsArray = res.data;
          for (var i = 0; i < res.data.length; i++) {
            var orginalDate = this.couponsArray[i]['expDate'];
            var singleObj = this.couponsArray[i];
            var fff = new Date(orginalDate).getTime();
            singleObj['expDate'] = fff;
            this.couponsArray[i] = singleObj;
          }
          this.isBusy = false;
        } else this.errorHandler(res.message);
      });
  }
  errorHandler(err: any) {
    this.isBusy = false;
    this._dataService.errorToast(err);
    window.scrollTo(0, 0);
  }
  showCopyCodeDialog(couponNode: any) {
    this.editObj = { ...couponNode };
    this._dataService.showCopyCodeAlert(this.editObj);
    window.open(this.editObj.trackingLink, '_blank');
  }
  getDealFunc(couponNode: any) {
    this.editObj = { ...couponNode };
    this._dataService.showGetDealAlert(this.editObj);
    window.open(this.editObj.trackingLink, '_blank');
  }
}

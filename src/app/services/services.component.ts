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
    if (window.screen.width < 450) this.mobile = true;
    if (window.screen.width < 830) this.smallScreen = true;
    this.route.paramMap.subscribe((paramMap) => {
      this.storeURLToShow = paramMap.get('id');
      this.loadStoreData(this.storeURLToShow);
    });
  }
  loadCoupons(id: any) {
    if (this.isBusy) return;
    this.isBusy = true;
    this._dataService
      .fetchWithQuery('/userDisplay/fetchCoupons', id)
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
        }
        //  else this.errorHandler(res.message);
      });
  }
  loadStoreData(id: any) {
    this._dataService
      .fetchWithQuery('/userDisplay/singleStoreData', id)
      .subscribe((res) => {
        if (res.data) {
          this.storeURL = res.data['0']['_id'];
          this.loadCoupons(this.storeURL);
          this.storePic = res.data['0']['img'];
          this.storeThumb = null;
          if (res.data['0']['thumbImg'])
            this.storeThumb = res.data['0']['thumbImg'];
          this.storeDetail = res.data['0']['shortDes'];
          this.longDes = res.data['0']['longDes'];
          this.storeName =
            res.data['0']['name'] + ' ' + res.data['0']['heading'];
          this.storeName2 = res.data['0']['name'];
          this.storeId = res.data['0']['storeURL'];
          var tempDateVar = Number(res.data['0']['CreatedAt']);
          this.storeDate =
            this.monthNames[new Date(tempDateVar).getMonth()] +
            ' ' +
            new Date(tempDateVar).getFullYear();
          this.titleService.setTitle(res.data['0']['metaTitle']);
          this.metaService.updateTag({
            name: 'description',
            content: res.data['0']['metaDes'],
          });
          this.metaService.updateTag({
            property: 'og:description',
            content: res.data['0']['metaDes'],
          });
          this.backUpForStores = res.data['0']['categoryRef'][0];
          // this.secondTabData(res.data['0']['categoryRef'][0])
        }
        //  else this.errorHandler(res.message);
      });
  }
  loadAnotherStore(id: any) {
    this.couponsArray = [];
    this.storeDetail = null;
    this.storeArray = [];
    this.loadCoupons(id);
    this.loadStoreData(id);
    this.storeURLToShow = id;
  }
  goToLinkFeatured(link: any, productId: any, key: any) {
    this.productsArray[key]['clicks']++;
    window.open(link, '_blank');
    this._dataService
      .postAPI('/userDisplay/increaseProductClicks', { id: productId })
      .subscribe((res) => {});
  }
  errorHandler(err: any) {
    this.isBusy = false;
    this._dataService.errorToast(err);
    window.scrollTo(0, 0);
  }

  showCopyCodeDialog(couponNode: any) {
    // this.editObj = { ...couponNode };
    // this._dataService.showCopyCodeAlert(this.editObj);
    this._dataService.showCopyCodeAlert({
      code: 'checkcode',
      offerBox: 'checok offerbox',
    });
    // window.open(this.editObj.trackingLink, '_blank');
  }
  getDealFunc(couponNode?: any) {
    this.editObj = { ...couponNode };
    this._dataService.showGetDealAlert(this.editObj);
    window.open(this.editObj.trackingLink, '_blank');
  }
}

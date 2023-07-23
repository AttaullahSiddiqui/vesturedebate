import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  storesLimit = 20;
  responseError = '';
  storeArray: Array<any> = [];
  isLoading = true;
  mobile: boolean = false;
  scrolledNum = 0;

  constructor(private _dataService: DataService, private titleService: Title) {}

  ngOnInit(): void {
    if (window.screen.width < 450) this.mobile = true;
    this.loadStoreCallBack();
    this.titleService.setTitle('Stores Collection');
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.scrolledNum > window.scrollY) {
      this.scrolledNum = window.scrollY;
      return;
    }
    this.scrolledNum = window.scrollY;
    let addNum = 450;
    if (this.mobile) addNum = 980;
    if (
      window.innerHeight + window.scrollY + addNum >=
      document.body.offsetHeight
    ) {
      this.loadMoreStores();
    }
  }
  loadStoreCallBack(abc?: string) {
    var _self = this;
    this.isLoading = true;
    this._dataService
      .fetchOnlyLimit('/userDisplay/fetchRandomStores', this.storesLimit)
      .subscribe((res) => {
        if (res.data) {
          if (!abc) {
            this.storeArray = res.data;
            this.storeArray = Array.from(new Set(this.storeArray));
            this.storesLimit += 20;
          }
          setTimeout(
            function () {
              _self.isLoading = false;
              if (abc) {
                _self.storeArray = res.data;
                _self.storeArray = Array.from(new Set(_self.storeArray));
                _self.storesLimit += 20;
              }
            }.bind(this),
            1000
          );
        } else this.errorHandler(res.message);
      });
  }
  loadMoreStores() {
    if (this.isLoading) return;
    this.loadStoreCallBack('abc');
  }
  errorHandler(err: any) {
    var _self = this;
    setTimeout(
      function () {
        _self.isLoading = false;
      }.bind(this),
      1000
    );
    this._dataService.errorToast(err);
    window.scrollTo(0, 0);
  }
}

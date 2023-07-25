import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryArr: any[] = [];
  storeArr: Array<any> = [];
  isLoading = false;
  selectCat = '';
  selectedCat: any = null;
  selectedCatURL: string = '';
  activeNode: string = '';
  smallScreen: Boolean = false;
  noStoreFound: Boolean = false;

  constructor(
    private _dataService: DataService,
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (window.screen.width < 830) this.smallScreen = true;
    this.route.paramMap.subscribe((paramMap) => {
      var targetCategoryId = paramMap.get('id');
      var targetCategoryName: string;
      this._dataService
        .fetchAPI('/userDisplay/fetchCategories')
        .subscribe((res) => {
          if (res.data) {
            this.categoryArr = res.data;
            res.data.forEach((element: any) => {
              if (element.categoryURL == targetCategoryId) {
                targetCategoryName = element.name;
                this.loadStores(element, element.categoryURL);
              }
            });
            this.activeNode = targetCategoryName || res.data[0].name;
          }
        });
    });
  }
  switchTab(catNode: any) {
    this.activeNode = catNode.name;
    this.loadStores(catNode, catNode.categoryURL);
    window.scrollTo(0, 0);
  }
  secondaryFunc(abc: any) {
    var _self = this;
    var xyz = Object.values(this.categoryArr);
    xyz.forEach(function (val) {
      if (val['categoryURL'] == abc) {
        _self.selectedCat = val['name'];
        _self.loadStores(val, val['categoryURL']);
      }
    });
  }
  loadStores(catNode: any, slctdURL: any) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.storeArr = [];
    this.titleService.setTitle(catNode['metaTitle']);
    this.metaService.updateTag({
      name: 'description',
      content: catNode['metaDescription'],
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: catNode['metaDescription'],
    });
    this._dataService
      .fetchWithQuery('/userDisplay/fetchStores', catNode._id)
      .subscribe((res) => {
        if (res.data) {
          this.storeArr = res.data;
          this.isLoading = false;
          if (!res.data.length) this.noStoreFound = true;
          else this.noStoreFound = false;
        } else {
          this._dataService.errorToast(res.message);
          this.noStoreFound = true;
        }
      });
  }
}

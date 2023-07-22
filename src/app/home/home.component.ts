import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
} from 'swiper';
SwiperCore.use([Pagination, Navigation, EffectCreative, Autoplay]);
import {
  faGear,
  faStore,
  faTags,
  faUserCircle,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  switch = false;
  searchBox = null;
  isBusy: Boolean = false;
  mobile: Boolean = false;
  noResult = false;
  storeArray = null;
  faSettingIcon = faGear;
  faStoreIcon = faStore;
  faTagIcon = faTags;
  faUserIcon = faUserCircle;
  faEnvelope = faEnvelope;
  config: SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    direction: 'horizontal',
    loop: false,
    loopFillGroupWithBlank: true,
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
  };
  couponsArray = null;
  slideArray = null;
  blogArray: Array<any> = [];
  smallScreen: Boolean = false;
  forBlogCategories: Array<any> = [];

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    if (window.screen.width < 830) this.smallScreen = true;
    this._dataService
      .fetchAPI('/userDisplay/fetchForBlogCategories')
      .subscribe((res) => {
        if (res.data) this.forBlogCategories = res.data;
      });
    this._dataService.fetchAPI('/userDisplay/fetchSlides').subscribe((res) => {
      if (res.data) this.slideArray = res.data;
      else this._dataService.errorToast(res.message);
    });
    this._dataService
      .fetchOnlyLimit('/userDisplay/fetchTopBlogs', 9)
      .subscribe((res) => {
        if (res.data) this.blogArray = res.data;
      });
    this._dataService
      .fetchOnlyLimit('/userDisplay/fetchTopStores', 9)
      .subscribe((res) => {
        if (res.data) this.storeArray = res.data;
      });
  }

  searchFunc(queri: any) {
    if (!queri) return;
    this.noResult = false;
    this.storeArray = null;
    this._dataService
      .fetchAPIWithLimit('/userDisplay/searchQuery', 10, queri, '')
      .subscribe((res) => {
        if (res.data) {
          this.storeArray = res.data;
        } else this.noResult = true;
      });
  }
  getInnerText(el: any) {
    return el.innerText;
  }
  openLink(link: any) {
    window.open(link, '_blank');
  }
  onSwiper(swiper: any) {
    swiper.update();
  }
  focusOutFunc() {
    setTimeout(() => {
      this.switch = false;
    }, 300);
  }
}

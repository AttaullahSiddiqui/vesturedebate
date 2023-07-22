import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  EffectCube,
  Autoplay,
  EffectFade,
} from 'swiper';
SwiperCore.use([Pagination, Navigation, EffectFade, Autoplay]);
import { faBars, faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  switch = false;
  faMenuIcon = faBars;
  faAdd = faAdd;
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
    loop: true,
    loopFillGroupWithBlank: true,
    grabCursor: true,
    effect: 'fade',
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
  slideArray = null;
  smallScreen: Boolean = false;
  searchInput = null;
  forBlogCategories: Array<any> = [];

  constructor(private _dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    if (window.screen.width < 830) this.smallScreen = true;
    this._dataService
      .fetchAPI('/userDisplay/fetchForBlogCategories')
      .subscribe((res) => {
        if (res.data) this.forBlogCategories = res.data;
      });
  }
  showSearchBar(url: string) {
    var location = window.location.pathname;
    return location.includes(url);
  }
  showSearchBarArray(url: Array<string>) {
    var location = window.location.pathname;
    for (var i = 0; i < url.length; i++) {
      if (location.includes(url[i])) return true;
    }
    return false;
  }
  focusOutFunc() {
    setTimeout(() => {
      this.switch = false;
    }, 100);
  }
  onSwiper(swiper: any) {
    swiper.update();
  }
}

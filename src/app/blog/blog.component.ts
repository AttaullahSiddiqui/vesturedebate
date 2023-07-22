import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faEnvelope,
  faHome,
  faPhoneAlt,
  faCheckDouble,
  faBan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit {
  faCheck = faCheckDouble;
  faBan = faBan;
  iFrameObj = null;
  blogNode: any = [];
  isFetching = false;
  blogURL: string = '';
  mobile: boolean = false;
  faCalendar = faCalendar;
  faEnvelope = faEnvelope;
  faHome = faHome;
  faPhone = faPhoneAlt;
  smallScreen: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private _dataService: DataService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    if (window.screen.width < 450) this.mobile = true;
    if (window.screen.width < 830) this.smallScreen = true;
    this.route.paramMap.subscribe((paramMap: any) => {
      this.blogURL = paramMap.get('id');
      this.isFetching = true;
      this._dataService
        .fetchWithQuery('/userDisplay/fetchSingleBlog', this.blogURL)
        .subscribe((res: any) => {
          if (res.data) {
            this.titleService.setTitle(res.data['metaTitle']);
            this.blogNode = res.data;
            this.isFetching = false;
          } else this.errorHandler(res.message);
        });
      this._dataService
        .postAPI('/userDisplay/increaseBlogViews', { id: this.blogURL })
        .subscribe((res: any) => {});
    });
  }
  // loadBlogImages(id) {
  //   this._dataService
  //     .fetchWithQuery("/userDisplay/fetchBlogItems", id)
  //     .subscribe((res) => {
  //       if (res.data) this.blogItems = res.data;
  //     });
  // }
  loadBlog(id: any) {
    this.isFetching = true;
    this._dataService
      .fetchWithQuery('/userDisplay/fetchSingleBlog', id)
      .subscribe((res: any) => {
        if (res.data) {
          this.blogNode = res.data;
          this.titleService.setTitle(res.data['0']['metaTitle']);
          this.metaService.updateTag({
            name: 'description',
            content: res.data['0']['metaDes'],
          });
          this.isFetching = false;
        } else this.errorHandler(res.message);
      });
  }
  errorHandler(err: any) {
    this.isFetching = false;
    this._dataService.errorToast(err);
    window.scrollTo(0, 0);
  }
  openLink(link: any) {
    window.open(link, '_blank');
  }
}

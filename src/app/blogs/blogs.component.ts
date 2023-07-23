import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  blogCategory: any = null;
  blogsArr: any[] = [];
  skipNo = 0;
  isFetching = false;
  limitVar: Number = 980;
  smallScreen: Boolean = false;
  noBlogFound: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    if (window.screen.width < 830) this.smallScreen = true;
    this.route.paramMap.subscribe((paramMap: any) => {
      this.blogCategory = paramMap.get('id');
      if (this.blogCategory) {
        this._dataService
          .fetchAPIWithLimit(
            '/userDisplay/fetchBlogsWithLimit',
            20,
            this.blogCategory,
            0
          )
          .subscribe((res) => {
            if (res.data) this.blogsArr = res.data;
            if (res.message == 'Unable to fetch more Blogs') {
              this.blogsArr = [];
              this.noBlogFound = true;
            }else this.noBlogFound = false;
          });
      } else this.fetchBlogs();
    });
  }
  fetchBlogs() {
    this.isFetching = true;
    this._dataService
      .fetchAPIWithLimit(
        '/userDisplay/fetchBlogsWithLimit',
        10,
        '',
        this.skipNo
      )
      .subscribe((res) => {
        if (res.data) {
          this.blogsArr = [];
          this.blogsArr = res.data;
          this.isFetching = false;
          window.scrollTo(0, 0);
        } else {
          this._dataService.errorToast(res.message);
          this.isFetching = false;
          if (this.skipNo) this.skipNo -= 6;
        }
      });
  }
  getInnerText(el: any) {
    return el.innerText;
  }
  loadNext() {
    if (this.isFetching) return;
    this.skipNo += 6;
    this.fetchBlogs();
  }
  loadPrev() {
    if (!this.skipNo) {
      this._dataService.errorToast('No more previous data exist');
      return;
    }
    if (this.isFetching) return;
    this.skipNo -= 6;
    this.fetchBlogs();
  }
  openLink(blogURL: any) {
    window.open('https://www.vesturedebate.com/blog/' + blogURL, '_blank');
  }
}

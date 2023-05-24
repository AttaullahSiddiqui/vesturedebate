import { Injectable } from '@angular/core';
import { finalize, skip } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { faThumbsUp, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  faThumbsUp = faThumbsUp;
  faShoppingIcon = faShoppingBag;
  constructor(private _http: HttpClient) {}
  fetchAPI(url: any) {
    return this._http
      .get(url)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  postAPI(url: any, reqData: any) {
    return this._http
      .post(url, reqData)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  putAPI(url: any, reqData: any) {
    return this._http
      .post(url, reqData)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  deleteAPI(url: any, reqData: any) {
    return this._http
      .delete(url, reqData)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIWithLimit(url: any, limit: any, id: any, skip?: any) {
    const params = {
      skipNo: skip,
      limitNo: limit,
      quer: id,
    };
    return this._http
      .get(url, { params: params })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  fetchOnlyLimit(url: any, limit: any) {
    return this._http
      .get(url, { params: { limitNo: limit } })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  fetchWithQuery(url: any, id: any) {
    return this._http
      .get(url, { params: { _id: id } })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIUsingId(url: any, id: any) {
    return this._http
      .get(url, { params: { _id: id } })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  sortAPI(url: any, updatedArray: any) {
    return this._http
      .post(url, updatedArray)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  successToast(msg: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 2200,
    });
  }
  errorToast(msg: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 2200,
    });
  }
  showGetDealAlert(editObj: any) {
    Swal.fire({
      title: `<strong>No code required</strong>`,
      icon: 'info',
      html: 'Just <b>click</b> below button to avail this deal',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<fa-icon [icon]="faThumbsUp"></fa-icon> Shop Now',
      confirmButtonAriaLabel: 'Shop Now button',
    }).then((result:any) => {
      if (result.isConfirmed) window.open(editObj.code, '_blank');
    });
  }
  showCopyCodeAlert(editObj: any) {
    this.copyToClipBoard(editObj.code);
    Swal.fire({
      title: `<strong>${editObj.code}</strong>`,
      icon: 'info',
      html: `Above code Copied <br> <br> <b>${editObj.offerBox}</b>`,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText: '<fa-icon [icon]="faShoppingIcon"></fa-icon> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    }).then((result:any) => {
      if (result.isConfirmed) this.copyToClipBoard(editObj.code);
    });
  }
  copyToClipBoard(code: string) {
    const el = document.createElement('textarea');
    el.value = code;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

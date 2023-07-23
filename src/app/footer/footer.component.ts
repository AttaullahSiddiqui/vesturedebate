import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';

import {
  faFacebook,
  faTwitter,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faApple,
  faGooglePlay,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedIn = faLinkedinIn;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faApple = faApple;
  faGooglePlay = faGooglePlay;
  faPinterest = faPinterest;
  isBusy: Boolean = false;
  contactEmail: string = '';
  contactName: string = '';

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {}

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  addEmailToDB(emailId: any) {
    if (this.isBusy) return;
    if (!emailId) {
      this._dataService.errorToast('Please fill out input field');
      return;
    }
    if (!this.validateEmail(emailId)) {
      this._dataService.errorToast('Provided Email is not valid');
      return;
    }
    this.isBusy = true;
    this._dataService
      .postAPI('/userDisplay/addEmailToDB', { emailId: emailId })
      .subscribe((res) => {
        if (res.data) {
          this.contactEmail = '';
          this.isBusy = false;
          this._dataService.successToast(
            'Successfully subscribed to our newsletter'
          );
        } else {
          this.isBusy = false;
          this._dataService.errorToast(res.message);
        }
      });
  }
  validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
}

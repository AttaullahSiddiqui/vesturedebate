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
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {}
}

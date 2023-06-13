import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private titleService: Title, private metaService: Meta) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      switch (state.url) {
        case '/categories': {
          this.titleService.setTitle(
            'Home decor to office supplies vesturedebate covers every aspect of desired products.'
          );
          this.metaService.updateTag({
            property: 'og:title',
            content:
              'Home decor to office supplies vesturedebate covers every aspect of desired products.',
          });
          // document.querySelector('meta[name="og:title"]').setAttribute("content", "Categories");
          // document.querySelector('meta[name="description"]').setAttribute("content", "From home to office supplies and tip to toe nurturing products, travel tickets to pet supplies, even everything that you need is including in vesturedebate.com. Set your lifestyle in a modish way from vesturedebate endows.");
          // document.querySelector('meta[property="og:description"]').setAttribute("content", "From home to office supplies and tip to toe nurturing products, travel tickets to pet supplies, even everything that you need is including in vesturedebate.com. Set your lifestyle in a modish way from vesturedebate endows.");
          this.metaService.updateTag({
            name: 'description',
            content:
              'From home to office supplies and tip to toe nurturing products, travel tickets to pet supplies, even everything that you need is including in vesturedebate.com. Set your lifestyle in a modish way from vesturedebate endows.',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'From home to office supplies and tip to toe nurturing products, travel tickets to pet supplies, even everything that you need is including in vesturedebate.com. Set your lifestyle in a modish way from vesturedebate endows.',
          });
          break;
        }
        case '/stores': {
          this.titleService.setTitle(
            'Meet uncountable astounding and spectacular stores at vesturedebate.'
          );
          this.metaService.updateTag({
            property: 'og:title',
            content:
              'Meet uncountable astounding and spectacular stores at vesturedebate.',
          });
          this.metaService.updateTag({
            name: 'description',
            content:
              'Innumerable splendor stores imparting you exorbitant brands in keeping with your desires, so you can swap your way of life into a peak level with vesturedebate.com.',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'Innumerable splendor stores imparting you exorbitant brands in keeping with your desires, so you can swap your way of life into a peak level with vesturedebate.com.',
          });
          break;
        }
        case '/blogs': {
          this.titleService.setTitle(
            'Let’s upgrade yourself from our latest trendy blogs only at vesturedebate.'
          );
          this.metaService.updateTag({
            name: 'description',
            content:
              'Let’s get trendy with vesturedebate.com because we keep you up to dated with posting the brand new and latest blogs for helping you to get aware of trendy products. Now get up to dated from the blissful brands according to your choice and dreams from our meaningful blogs.',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'Let’s get trendy with vesturedebate.com because we keep you up to dated with posting the brand new and latest blogs for helping you to get aware of trendy products. Now get up to dated from the blissful brands according to your choice and dreams from our meaningful blogs.',
          });
          this.metaService.updateTag({
            property: 'og:title',
            content:
              'Let’s upgrade yourself from our latest trendy blogs only at vesturedebate.',
          });
          break;
        }
        case '/products': {
          this.titleService.setTitle(
            'All your desires come to fulfill at vesturedebate.'
          );
          this.metaService.updateTag({
            name: 'description',
            content:
              'Get healthy with the supplements, sleep well with comfy bedding, stay shine with beauty products, get warm in winter and cool in summer with the apparel, even every product that you need you can obtain from a single website vesturedebate.com.',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'Get healthy with the supplements, sleep well with comfy bedding, stay shine with beauty products, get warm in winter and cool in summer with the apparel, even every product that you need you can obtain from a single website vesturedebate.com.',
          });
          this.metaService.updateTag({
            property: 'og:title',
            content: 'All your desires come to fulfill at vesturedebate.',
          });
          break;
        }
        case '/': {
          this.titleService.setTitle(
            'VestureDebate | Relish the acute deals & offers at home solely from VestureDebate.'
          );
          this.metaService.updateTag({
            name: 'description',
            content:
              'Discover a world of shopping delights! Explore our captivating blog for expert tips, trends, and irresistible deals that will transform your shopping experience',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'Discover a world of shopping delights! Explore our captivating blog for expert tips, trends, and irresistible deals that will transform your shopping experience',
          });
          this.metaService.updateTag({
            property: 'og:title',
            content:
              'Relish the acute deals & offers at home solely from vesturedebate.',
          });
          break;
        }
        case '/event': {
          this.titleService.setTitle(
            'Enjoy exquisite discount offers at special events only at vesturedebate.'
          );
          this.metaService.updateTag({
            name: 'description',
            content:
              'Do you want to make the best out of the special days of the year? vesturedebate is here with amazing coupon codes, vouchers and discount deals to help you in it.',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'Do you want to make the best out of the special days of the year? vesturedebate is here with amazing coupon codes, vouchers and discount deals to help you in it.',
          });
          this.metaService.updateTag({
            property: 'og:title',
            content:
              'Enjoy exquisite discount offers at special events only at vesturedebate.',
          });
          break;
        }
      }
      return resolve(true);
    });
  }
}

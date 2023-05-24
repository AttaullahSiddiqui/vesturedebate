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
            'OutOnaBudget | Relish the acute deals & offers at home solely from OutonaBudget.'
          );
          this.metaService.updateTag({
            name: 'description',
            content:
              'Beyond belief, now you can encounter the simplistic and rouse shopping experience at your home with vesturedebate.com. Discover the trendy and your preferred products from copious online stores with multitude coupons, vouchers and promo codes. We make trusty customers from all around the world by offering the finest and leading deals, so they can do firm believe on us and get the things that their heart always wished for. We are on a mission to provide immense enormous discounts on lavish brands in just a single click at ease. Now you can get the amazing deals with vesturedebate.com.',
          });
          this.metaService.updateTag({
            property: 'og:description',
            content:
              'Beyond belief, now you can encounter the simplistic and rouse shopping experience at your home with vesturedebate.com. Discover the trendy and your preferred products from copious online stores with multitude coupons, vouchers and promo codes. We make trusty customers from all around the world by offering the finest and leading deals, so they can do firm believe on us and get the things that their heart always wished for. We are on a mission to provide immense enormous discounts on lavish brands in just a single click at ease. Now you can get the amazing deals with vesturedebate.com.',
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

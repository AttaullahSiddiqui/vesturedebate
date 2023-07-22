import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { StoreComponent } from './store/store.component';
import { StoresComponent } from './stores/stores.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthService] },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthService],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthService],
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    canActivate: [AuthService],
  },
  {
    path: 'stores',
    component: StoresComponent,
    canActivate: [AuthService],
  },
  {
    path: 'stores/:id',
    component: StoreComponent,
    canActivate: [AuthService],
  },
  { path: 'blogs', component: BlogsComponent, canActivate: [AuthService] },
  { path: 'blogs/:id', component: BlogsComponent, canActivate: [AuthService] },
  { path: 'blog/:id', component: BlogComponent, canActivate: [AuthService] },
  { path: 'about', component: AboutComponent, canActivate: [AuthService] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthService] },
  {
    path: 'termsandconditions',
    component: TermsComponent,
    canActivate: [AuthService],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProductsComponent } from './views/products/products/products.component';
import { AddStockComponent } from './views/products/add-stock/add-stock.component';
import { WatchAdsComponent } from './views/watch-ads/watch-ads.component';
import { CustomersComponent } from './views/customers/customers.component';
import { ForgotpasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { ViewStockComponent } from './views/products/view-stock/view-stock.component';
import { CouponCodeComponent } from './views/coupon-code/coupon-code.component';
import { DashboardUsersComponent } from './views/dashboard-users/dashboard-users.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'customers',
        component: CustomersComponent,
        data: {
          title: 'Customers'
        }
      },
      {
        path: 'dashboardUsers',
        component: DashboardUsersComponent,
        data: {
          title: 'Dashboard User Page'
        }
      },
      {
        path: 'generateCoupons',
        component: CouponCodeComponent,
        data: {
          title: 'Coupon Code Page'
        }
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: {
          title: 'Products Page'
        }
      },
      {
        path: 'addStock',
        component: AddStockComponent,
        data: {
          title: 'Add Product Page'
        }
      },
      {
        path: 'viewStock/:ID',
        component: ViewStockComponent,
        data: {
          title: 'View Product Page'
        }
      },
      {
        path: 'watchAds',
        component: WatchAdsComponent,
        loadChildren: './views/watch-ads/watch-ads.module#WatchAdsModule',
        data: {
          title: 'Ads Page'
        }
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

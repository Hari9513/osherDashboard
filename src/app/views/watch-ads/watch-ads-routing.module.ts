import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AlertsComponent } from './alerts.component';
// import { BadgesComponent } from './badges.component';
import { ModalsComponent } from './modals.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Watch Ads'
    },
    children: [
      {
        path: 'modals',
        component: ModalsComponent,
        data: {
          title: 'Modals'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchAdsRoutingModule {}

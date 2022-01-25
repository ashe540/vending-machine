import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerRoleGuard } from '../core/auth/buyer-role.guard';
import { SellerRoleGuard } from '../core/auth/seller-role.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopModule),
        canActivate: [BuyerRoleGuard],
      },
      {
        path: 'management',
        loadChildren: () =>
          import('./management/management.module').then(
            (m) => m.ManagementModule
          ),
        canActivate: [SellerRoleGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

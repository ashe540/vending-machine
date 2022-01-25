import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { DepositComponent } from './deposit/deposit.component';
import { SharedModule } from '../../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PurchasesComponent } from './purchases/purchases.component';

@NgModule({
  declarations: [ShopComponent, DepositComponent, PurchasesComponent],
  providers: [],
  imports: [CommonModule, SharedModule, SweetAlert2Module, ShopRoutingModule],
})
export class ShopModule {}

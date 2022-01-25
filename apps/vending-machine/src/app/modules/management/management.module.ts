import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    ManagementComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [CommonModule, SharedModule, ManagementRoutingModule],
})
export class ManagementModule {}

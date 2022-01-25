import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './services/toast.service';

import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoaderComponent } from './components/loader/loader.component';

const components = [
  MainLayoutComponent,
  SidebarComponent,
  HeaderComponent,
  LoaderComponent,
  ProductListComponent,
];
const services = [ToastService];

@NgModule({
  declarations: [...components],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [...services],
  bootstrap: [],
  exports: [
    ...components,
    ReactiveFormsModule,
    SweetAlert2Module,
  ],
})
export class SharedModule {}

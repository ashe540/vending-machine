import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [MainRoutingModule, CommonModule, SharedModule],
  declarations: [MainComponent, HomeComponent],
  providers: [],
})
export class MainModule {}

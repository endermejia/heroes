import {NgModule} from '@angular/core';

import {NobelRoutingModule} from './nobel-routing.module';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';

import {GalardonComponent} from './pages/galardon/galardon.component';
import {HomeComponent} from './pages/home/home.component';
import {SearchComponent} from './pages/search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    GalardonComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    NobelRoutingModule,
    MaterialModule
  ]
})
export class NobelModule {
}

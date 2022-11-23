import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HeroesRoutingModule} from './heroes-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HeroDetailComponent} from './pages/detail/hero-detail.component';
import {HomeComponent} from './pages/home/home.component';
import {SearchComponent} from './pages/search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroDetailComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    HttpClientModule
  ]
})
export class HeroesModule {
}

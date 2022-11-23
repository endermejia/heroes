import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HeroesRoutingModule} from './heroes-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HeroDetailComponent} from './pages/detail/hero-detail.component';
import {HomeComponent} from './pages/home/home.component';
import {SearchComponent} from './pages/search/search.component';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    HomeComponent,
    HeroDetailComponent,
    SearchComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        HeroesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class HeroesModule {
}

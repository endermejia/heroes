import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroDetailComponent} from './pages/detail/hero-detail.component';
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SearchComponent
      },
      {
        path: 'heroe/:id',
        component: HeroDetailComponent
      },
      {
        path: 'nuevo-heroe',
        component: HeroDetailComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalardonComponent} from './pages/galardon/galardon.component';
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
        path: 'galardon/:awardYear',
        component: GalardonComponent
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
export class NobelRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@modules/home/layout/layout.component';

import { SummaryComponent } from './summary/summary.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Amaury Valorge - Portfolio', page: 'about_me' }
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

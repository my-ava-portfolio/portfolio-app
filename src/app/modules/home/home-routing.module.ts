import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeViewComponent } from '@modules/home/home-view/home-view.component';

import { ProfilCardComponent } from '@modules/home/profil-card/profil-card.component';
import { ToolboxComponent } from '@modules/home/toolbox/toolbox.component'

const routes: Routes = [
  {
    path: '', component: HomeViewComponent, children: [
      { path: 'about_me', component: ProfilCardComponent, data: { title: 'Bienvenue', page: 'about_me' } },
      { path: 'sandbox', component: ToolboxComponent, data: { title: 'Bac à sable', page: 'sandbox' } }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeViewComponent } from '@modules/home/home-view/home-view.component';

import { ProfilCardComponent } from '@modules/home/profil-card/profil-card.component';


const routes: Routes = [
  {
    path: '', component: HomeViewComponent, children: [
      { path: 'about_me', component: ProfilCardComponent, data: { title: 'Bienvenue', page: 'about_me' } }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

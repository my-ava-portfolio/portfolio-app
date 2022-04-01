import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@modules/home/layout/layout.component';

import { ProfilCardComponent } from '@modules/home/profil-card/profil-card.component';


const routes: Routes = [
  {
    path: 'about_me',
    component: LayoutComponent,
    data: { title: 'Bienvenue', page: 'about_me' }
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperiencesViewComponent } from '@modules/experiences/experiences-view/experiences-view.component';


const routes: Routes = [
  { path: '', component: ExperiencesViewComponent, data: { title: 'Formation', page: 'education' } },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencesRoutingModule { }

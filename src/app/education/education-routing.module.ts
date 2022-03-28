import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EducationViewComponent } from '@modules/education/education-view/education-view.component';


const routes: Routes = [
  { path: '', component: EducationViewComponent, data: { title: 'Formation', page: 'education' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }

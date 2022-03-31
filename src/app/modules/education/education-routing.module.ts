import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LayoutComponent } from '@modules/education/layout/layout.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, data: { title: 'Formation', page: 'education' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }

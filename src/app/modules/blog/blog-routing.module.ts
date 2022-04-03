import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@modules/blog/layout/layout.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, data: { title: 'Blog', page: 'blog' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@modules/gallery/layout/layout.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, data: { title: 'Galerie', page: 'gallery' } },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }

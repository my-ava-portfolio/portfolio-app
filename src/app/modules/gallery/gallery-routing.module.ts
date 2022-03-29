import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryViewComponent } from '@modules/gallery/gallery-view/gallery-view.component';


const routes: Routes = [
  { path: '', component: GalleryViewComponent, data: { title: 'Galerie', page: 'gallery' } },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesViewComponent } from '@modules/blog/notes-view/notes-view.component';


const routes: Routes = [
  { path: '', component: NotesViewComponent, data: { title: 'Blog', page: 'blog' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

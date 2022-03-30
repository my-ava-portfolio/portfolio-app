import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from '@shared/layout/main-view/main-view.component';


const appRoutes: Routes = [

  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'experiences',
        loadChildren: () => import('@modules/experiences/experiences.module').then(m => m.ExperiencesModule),
      },
      {
        path: 'education',
        loadChildren: () => import('@modules/education/education.module').then(m => m.EducationModule),
      },
      {
        path: 'gallery',
        loadChildren: () => import('@modules/gallery/gallery.module').then(m => m.GalleryModule),
      },
      {
        path: 'map',
        loadChildren: () => import('@modules/map/map.module').then(m => m.MapModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('@modules/blog/blog.module').then(m => m.BlogModule),
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' }, // in order to redirect to the home page if the main url is called
    ]
  },
  // no layout routes
  // { path: 'map', component: MapViewComponent, pathMatch: 'full'  },
  // { path: 'short_resume', component: ShortViewComponent, data: { title: 'Profil', page: 'short_resume' } },
  // { path: 'home', component: HomeViewComponent, data: { title: 'Amaury Valorge Portfolio' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // [x, y]
      useHash: true, // in order to prevent error 40 page on reload
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

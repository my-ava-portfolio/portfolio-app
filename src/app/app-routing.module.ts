import { NgModule } from '@angular/core';
import { PreloadingStrategy, Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@bases/layout/layout.component';
import { educationPages, experiencesPages } from '@core/global-values/topics';

import { Observable, of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}


const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule),
        data: { preload: true, title: 'Amaury Valorge - Portfolio', page: 'about_me', anchors: []}
      },
      {
        path: 'experiences',
        loadChildren: () => import('@modules/experiences/experiences.module').then(m => m.ExperiencesModule),
        data: { title: 'Expériences', page: 'experiences', anchors: experiencesPages.sub_menus } 
      },
      {
        path: 'resume',
        loadChildren: () => import('@modules/resume-legacy/resume-legacy.module').then(m => m.ResumeLegacyModule),
        data: { title: 'CV', page: 'resume', anchors: [] } 
      },
      {
        path: 'education',
        loadChildren: () => import('@modules/education/education.module').then(m => m.EducationModule),
        data: { title: 'Formation', page: 'education', anchors: educationPages.sub_menus }
      },
      {
        path: 'gallery',
        loadChildren: () => import('@modules/gallery/gallery.module').then(m => m.GalleryModule),
        data: { title: 'Galerie', page: 'gallery', anchors: [] }
      },
      {
        path: 'maps',
        loadChildren: () => import('@modules/maps/maps.module').then(m => m.MapsModule),
        data: { title: 'Cartes', page: 'home', anchors: [] }
      },
      {
        path: 'blog',
        loadChildren: () => import('@modules/blog/blog.module').then(m => m.BlogModule),
        data: { title: 'Blog', page: 'blog', anchors: [] }
      },
      { path: '**', redirectTo: '/home', pathMatch : 'full' }, // in order to redirect to the home page if the main url is called
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // [x, y]
      useHash: true, // in order to prevent error 40 page on reload,
      // preloadingStrategy: CustomPreloadingStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

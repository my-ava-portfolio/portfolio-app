// import { MapGtfsViewerModule } from './../map-gtfs-viewer/map-gtfs-viewer.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapAppLayoutComponent } from './map-app-layout/map-app-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';


const routes: Routes = [
  {
    path: 'app',
    component: MapAppLayoutComponent,
    children: [
      {
        path: 'activities',
        loadChildren: () => import('@modules/map-activities/map-activities.module').then(m => m.MapActivitiesModule),
      },
      {
        path: 'sandbox',
        loadChildren: () => import('@modules/map-sandbox/map-sandbox.module').then(m => m.MapSandboxModule),
      },
      {
        path: 'gtfs-viewer',
        loadChildren: () => import('@modules/map-gtfs-viewer/map-gtfs-viewer.module').then(m => m.MapGtfsViewerModule),
      },
      { path: '', redirectTo: '', pathMatch : 'full' }, // in order to redirect to the home page if the main url is called
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }

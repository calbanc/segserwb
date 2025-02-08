import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonePage } from './zone.page';
import { TabZoneComponent } from './tabzone.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabZoneComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'listado',
          },
          {
            path: 'home',
            loadChildren: () => import('../../home/home.module').then((m) => m.HomePageModule),
          },
          {
            path: 'crear',
            loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
          },
          {
            path: 'listado',
            loadChildren: () => import('./listado/listado.module').then( m => m.ListadoPageModule)
          }
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ZonePageRoutingModule {}

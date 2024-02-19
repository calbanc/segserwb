import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsClientsComponent } from './tabclientes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabsClientsComponent,
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
export class ClientsPageRoutingModule {}

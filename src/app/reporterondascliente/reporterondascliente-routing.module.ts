import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporterondasclientePage } from './reporterondascliente.page';

const routes: Routes = [
  {
    path: '',
    component: ReporterondasclientePage
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporterondasclientePageRoutingModule {}

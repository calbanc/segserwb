import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardiasPage } from './guardias.page';

const routes: Routes = [
  {
    path: '',
    component: GuardiasPage
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardiasPageRoutingModule {}

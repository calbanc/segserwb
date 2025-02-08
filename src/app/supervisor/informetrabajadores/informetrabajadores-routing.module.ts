import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformetrabajadoresPage } from './informetrabajadores.page';

const routes: Routes = [
  {
    path: '',
    component: InformetrabajadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformetrabajadoresPageRoutingModule {}

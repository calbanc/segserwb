import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportetrabajadorcontratistaPage } from './reportetrabajadorcontratista.page';

const routes: Routes = [
  {
    path: '',
    component: ReportetrabajadorcontratistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportetrabajadorcontratistaPageRoutingModule {}

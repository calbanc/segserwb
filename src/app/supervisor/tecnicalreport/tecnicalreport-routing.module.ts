import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TecnicalreportPage } from './tecnicalreport.page';

const routes: Routes = [
  {
    path: '',
    component: TecnicalreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TecnicalreportPageRoutingModule {}

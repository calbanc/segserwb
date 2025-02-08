import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportemensualPage } from './reportemensual.page';

const routes: Routes = [
  {
    path: '',
    component: ReportemensualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportemensualPageRoutingModule {}

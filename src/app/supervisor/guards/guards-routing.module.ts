import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardsPage } from './guards.page';

const routes: Routes = [
  {
    path: '',
    component: GuardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardsPageRoutingModule {}

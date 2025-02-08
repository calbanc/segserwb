import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuardsPageRoutingModule } from './guards-routing.module';

import { GuardsPage } from './guards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuardsPageRoutingModule
  ],
  declarations: [GuardsPage]
})
export class GuardsPageModule {}

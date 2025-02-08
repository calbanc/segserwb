import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportetrabajadorcontratistaPageRoutingModule } from './reportetrabajadorcontratista-routing.module';

import { ReportetrabajadorcontratistaPage } from './reportetrabajadorcontratista.page';
import { PrimemodulesModule } from '../../primemodules/primemodules.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimemodulesModule,
    ReportetrabajadorcontratistaPageRoutingModule
  ],
  declarations: [ReportetrabajadorcontratistaPage]
})
export class ReportetrabajadorcontratistaPageModule {}

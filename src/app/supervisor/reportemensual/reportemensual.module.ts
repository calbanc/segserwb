import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportemensualPageRoutingModule } from './reportemensual-routing.module';

import { ReportemensualPage } from './reportemensual.page';
import { PrimemodulesModule } from '../primemodules/primemodules.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimemodulesModule,
    ReportemensualPageRoutingModule
  ],
  declarations: [ReportemensualPage]
})
export class ReportemensualPageModule {}

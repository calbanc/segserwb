import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecnicalreportPageRoutingModule } from './tecnicalreport-routing.module';

import { TecnicalreportPage } from './tecnicalreport.page';
import { PrimemodulesModule } from '../primemodules/primemodules.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecnicalreportPageRoutingModule,
    PrimemodulesModule
  ],
  declarations: [TecnicalreportPage]
})
export class TecnicalreportPageModule {}

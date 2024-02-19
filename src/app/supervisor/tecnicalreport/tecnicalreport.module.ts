import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecnicalreportPageRoutingModule } from './tecnicalreport-routing.module';

import { TecnicalreportPage } from './tecnicalreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecnicalreportPageRoutingModule
  ],
  declarations: [TecnicalreportPage]
})
export class TecnicalreportPageModule {}

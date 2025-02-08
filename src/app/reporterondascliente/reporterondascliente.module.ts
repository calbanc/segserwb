import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporterondasclientePageRoutingModule } from './reporterondascliente-routing.module';

import { ReporterondasclientePage } from './reporterondascliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporterondasclientePageRoutingModule
  ],
  declarations: [ReporterondasclientePage]
})
export class ReporterondasclientePageModule {}

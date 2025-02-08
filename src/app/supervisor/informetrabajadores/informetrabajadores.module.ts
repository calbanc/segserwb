import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformetrabajadoresPageRoutingModule } from './informetrabajadores-routing.module';

import { InformetrabajadoresPage } from './informetrabajadores.page';
import { PrimemodulesModule } from '../primemodules/primemodules.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimemodulesModule,
    InformetrabajadoresPageRoutingModule
  ],
  declarations: [InformetrabajadoresPage]
})
export class InformetrabajadoresPageModule {}

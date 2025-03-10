import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajadoresPageRoutingModule } from './trabajadores-routing.module';

import { TrabajadoresPage } from './trabajadores.page';
import { PrimemodulesModule } from '../primemodules/primemodules.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajadoresPageRoutingModule,
    PrimemodulesModule
  ],
  declarations: [TrabajadoresPage]
})
export class TrabajadoresPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuardiasPageRoutingModule } from './guardias-routing.module';

import { GuardiasPage } from './guardias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuardiasPageRoutingModule
  ],
  declarations: [GuardiasPage]
})
export class GuardiasPageModule {}

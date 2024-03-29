import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZonePageRoutingModule } from './zone-routing.module';

import { ZonePage } from './zone.page';
import { TabZoneComponent } from './tabzone.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZonePageRoutingModule
  ],
  declarations: [ZonePage,TabZoneComponent]
})
export class ZonePageModule {}

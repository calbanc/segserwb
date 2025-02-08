import { TabPointComponent } from './tabpoint.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointPageRoutingModule } from './point-routing.module';

import { PointPage } from './point.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointPageRoutingModule
  ],
  declarations: [PointPage,TabPointComponent]
})
export class PointPageModule {}

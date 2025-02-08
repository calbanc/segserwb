import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlaccesoPageRoutingModule } from './controlacceso-routing.module';

import { ControlaccesoPage } from './controlacceso.page';

import { TableModule } from "primeng/table";
import { InputTextModule} from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";

import { PanelModule } from "primeng/panel";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ControlaccesoPageRoutingModule,
        TableModule,
        PanelModule,


    ],
  declarations: [ControlaccesoPage]
})
export class ControlaccesoPageModule {}

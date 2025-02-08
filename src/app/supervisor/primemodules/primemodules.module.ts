import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from "primeng/table";
import { InputTextModule} from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { PanelModule} from "primeng/panel";
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from "primeng/message";
import { DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [],
  exports:[
    TableModule,
    InputTextModule,
    MenubarModule,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    PanelModule,
    MessageModule,
    DialogModule
  ],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    MenubarModule,
    PanelModule,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    PanelModule,
    MessageModule,
    DialogModule
  ]
})
export class PrimemodulesModule { }

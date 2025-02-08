import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { CrearPageModule } from './crear/crear.module';
import { TabsUsuariosComponent } from './tabsusuarios.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    HeaderModule,

    CrearPageModule
  ],
  declarations: [UsuariosPage,TabsUsuariosComponent]
})
export class UsuariosPageModule {}

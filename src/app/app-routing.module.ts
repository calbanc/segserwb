import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./supervisor/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./supervisor/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'zone',
    loadChildren: () => import('./supervisor/zone/zone.module').then( m => m.ZonePageModule)
  },
  {
    path: 'point',
    loadChildren: () => import('./supervisor/point/point.module').then( m => m.PointPageModule)
  },
  {
    path: 'guards',
    loadChildren: () => import('./supervisor/guards/guards.module').then( m => m.GuardsPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./supervisor/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./supervisor/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'tecnicalreport',
    loadChildren: () => import('./supervisor/tecnicalreport/tecnicalreport.module').then( m => m.TecnicalreportPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

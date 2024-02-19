import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menuCtrl:MenuController,
    private _route:Router,
  ){

  }

  cerrarsesion(){
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LOGIN');
    localStorage.removeItem('IDCOMPANY');
    localStorage.removeItem('ROLE');
    this.menuCtrl.close('first');
    this._route.navigate(['/home']);
  }
}

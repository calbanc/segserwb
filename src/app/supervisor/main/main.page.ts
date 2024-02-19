import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private _route:Router,
    private menuCtrl:MenuController
  ) { }

  ngOnInit() {
  }

  cerrarsesion(){
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LOGIN');
    localStorage.removeItem('IDCOMPANY');
    localStorage.removeItem('ROLE');
    this.menuCtrl.close('first');
    this._route.navigate(['home']);
  }

}

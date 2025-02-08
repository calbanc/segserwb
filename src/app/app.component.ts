import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  public role:any;
  constructor(
    private menuCtrl:MenuController,
    private _route:Router,
  ){  

    this.validarislogin();
  }
  ngOnInit() {
   
   // this.validarislogin();
  }

  
  cerrarsesion(){
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LOGIN');
    localStorage.removeItem('IDCOMPANY');
    localStorage.removeItem('ROLE');
    this.menuCtrl.close('first');
    
    this._route.navigate(['/home']);
  }

  validarislogin(){

    
   

    
    this.role=localStorage.getItem('ROLE');

    
  //  this.role=='SUPERVISOR' ? this._route.navigate(['main']) : this.role=='CLIENTE' ? this._route.navigate(['clientepanel']) : null;
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public role:any;
  constructor(
    private _route:Router,
    private menuCtrl:MenuController
  ) { }

  ngOnInit() {
    this.validarislogin();
  }
  DoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.validarislogin()
  }
  async validarislogin(){

    
    
    const token=localStorage.getItem('TOKEN')!;
    if(token!=null) {
      const isexpired= Date.now()>=jwtDecode(token).exp! *1000 ;
      
      if(isexpired==true){
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('LOGIN');
        localStorage.removeItem('IDCOMPANY');
        localStorage.removeItem('ROLE');
        
        this._route.navigate(['home']);
      }  
    }
    


    
     this.role=await localStorage.getItem('ROLE');
    
    this.menuCtrl.open('first');

    
  
    
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

import { Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../services/UserService.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario:Usuario;

  constructor(
    public usuarioService:UserService,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public _route:Router,
  ) {
    this.usuario=new Usuario('','','','','','','','','','');

    this.validarislogin();

  }
  validarislogin(){
    
    localStorage.getItem('TOKEN');
    let role=localStorage.getItem('ROLE');

    if(role=='SUPERVISOR'){
      this._route.navigate(['main']);
    }
  }

  async validausuario(){
    var message="Ingresando espere porfavor";
    const loading=await this.loadingController.create({
      message:message
    });
    loading.present();
    this.usuarioService.login(this.usuario).subscribe(
      response=>{
        loading.dismiss();
        if(response.status=='ok'){
          localStorage.setItem('TOKEN',response.token);
          this.getuser();
        }
      },error=>{
        loading.dismiss()
        this.presentAlert('USUARIO O CLAVE ERRADA');

      }
    )

  }

  async getuser(){
    var message="Guardando Credenciales";
    const loading=await this.loadingController.create({
      message:message
    });
    loading.present();

    this.usuarioService.getuser(this.usuario).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          let idcompanyuser=response.data[0].IDCOMPANYUSER;
          let role=response.data[0].role.NAME;
          localStorage.setItem('IDCOMPANY',idcompanyuser);
          localStorage.setItem('ROLE',role);
          localStorage.setItem('LOGIN','YES');


          if(role=="SUPERVISOR"){
            this._route.navigate(['main']);
          }else{
            if(role=="CLIENTE"){
              this._route.navigate
            }else{
              localStorage.removeItem('TOKEN');
              localStorage.removeItem('LOGIN');
              localStorage.removeItem('IDCOMPANY');
              localStorage.removeItem('ROLE');
              this.presentAlert('NO TIENE PERMISOS PARA USAR LA PLATAFORMA');
              //NO TIENE PERMISOS PARA USAR LA PLATAFORMA
            }
          }

        }
      },error=>{

      }
    );
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Login',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }

}



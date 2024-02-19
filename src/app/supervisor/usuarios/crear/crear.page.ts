import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Role } from 'src/app/models/role';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/UserService.service';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public user:Usuario
  public idcompany=localStorage.getItem('IDCOMPANY');
  public role:Role;
  public roles:any
  public company:Company
  public clients:any;
  public roleselec:any;
  public showclient:boolean=false;
  constructor(
    private userService:UserService,
    private clientService:ClientsService,
    private alertController:AlertController
  ) {
    this.company=new Company('','');
    this.role=new Role(0,'','');
    this.user=new Usuario('','','','','','','','','','');
   }

  ngOnInit() {
 
    this.getrolebycompany();
    this.getclientsbycompany();

  }
  getclientsbycompany(){
    this.company.IDCOMPANY=this.idcompany!;
    this.clientService.clientsearchbycompay(this.company).subscribe(
      response=>{
        if(response.code=='200'){
          this.clients=response.data;
        }
      },error=>{

      }
    )
  }
  getrolebycompany(){
    this.role.IDCOMPANY=this.idcompany!;
    this.userService.getrolebycompany(this.role).subscribe(
      response=>{
        if(response.code=="200"){
          this.roles=response.data;

        }
      },error=>{
        console.log(error);
      }
    )


  }
  checkisclient(){
    console.log(this.roleselec.ID);
    this.user.IDROLE=this.roleselec.ID;
    if(this.roleselec.NAME=='CLIENTE'){
      this.showclient=true;
    }

  }
  registrar(formulario:any){
    this.user.IDCOMPANYUSER=this.idcompany!;
  

      this.userService.registeruser(this.user).subscribe(
        response=>{
            if(response.code=='200'){
              this.presentAlert('Usuario Registrado Correctamente');
              formulario.resetForm();
            }else{
              this.presentAlert('No se pudo registrar usuario');
            }
        },error=>{
          this.presentAlert('No se pudo registro usuario')
        }
      )


  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro de Usuario',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }
}

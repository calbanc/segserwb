import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService.service';
import { Usuario } from 'src/app/models/usuario';
import { Role } from 'src/app/models/role';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  public idcompany=localStorage.getItem('IDCOMPANY');
  public user:Usuario;
  public role:Role;
  public roles:any;
  public usuarios:any;
  constructor(
    private userService:UserService,
    private alertController:AlertController,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) {
    this.role=new Role(0,'','');
    this.user=new Usuario('','','','','','','','','','');
  }

  ngOnInit() {
    this.user.IDCOMPANYUSER=this.idcompany!;
    this.user.IDROLE="TODOS";
    this.getuserbycompany();
    this.getrolebycompany();

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
  
  async getuserbycompany(){

    var message="Mostrando Usuarios ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.userService.getuserbycompany(this.user).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          this.usuarios=response.data;
        }
      },error=>{
        loading.dismiss();
      }
    )
  }
 
  async eliminarusuario(user:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Usuario!',
      message: 'Desea eliminar el usuario',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {

            text: 'Eliminar',
              handler: () => {
                this.user=user;
                this.userService.deleteuser(this.user).subscribe(
                  response=>{
                    if(response.code=='200'){
                      this.user.IDROLE="TODOS";
                      this.getuserbycompany();
                    }
                  },error=>{
            
                  }
                )

          }


        }
      ]
    });

    await alert.present();
  }

  async editarusuario(user:any){
      this.user=user;
     const alert = await this.alertController.create({
      
      header: 'Editar usuario',
      message: 'Desea editar el usuario',
      inputs: [
        {
          name: 'NAME',
          placeholder: 'Ingrese Nombre de Usuario',
         
          label:"Nombre de Usuario"
        },
        {
          name: 'PRIMARYNAME',
          placeholder: 'Ingrese Apellido Paterno',
       
          label:'Apellido Paterno'
        },
        {
          name: 'LASTNAME',
          placeholder: 'Ingrese Apellido Materno',
         
          label:'Apellido Materno'
        },
        {
          name: 'EMAIL',
          placeholder: 'Ingrese Email',
         
          label:'Email'
        },

      ],
      buttons: [
       {
          text: 'Editar',
          cssClass:'primary',
          handler: (data) => {
            
            if(data.NAME!='') this.user.NAME=data.NAME;
            if(data.PRIMARYNAME!='') this.user.PRIMARYNAME=data.PRIMARYNAME;
            if(data.LASTNAME!='') this.user.LASTNAME=data.LASTNAME;
            if(data.EMAIL!='') this.user.EMAIL=data.EMAIL;
         

            this.userService.updateuser(this.user).subscribe(
              response=>{
               if(response.code=='200'){
                this.presentToast('Usuario editado correctamente');
                this.getuserbycompany();
               }
              },error=>{

              }
            )
            



          }
        }
      ]
    });

    await alert.present();

  }

  
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

}

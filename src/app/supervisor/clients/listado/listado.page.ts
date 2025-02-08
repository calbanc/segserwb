import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

import { ClientsService } from 'src/app/services/ClientsService.service';
import { LoadingController,AlertController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  public company:Company
  public idcompany=localStorage.getItem('IDCOMPANY'); 
  public clientes:any;
   constructor(
   
    private clientsService:ClientsService,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private toastController:ToastController
  ) { 
    this.company= new Company('','');
  }

  ngOnInit() {
    
    this.company.IDCOMPANY=this.idcompany!;
    
    this.getclientsbycompany();
  }
  async getclientsbycompany(){
    
    var message="Mostrando Clientes ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.company.IDCOMPANY=this.idcompany!;
    this.clientsService.clientsearchbycompay(this.company).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          this.clientes=response.data;

        }
      },error=>{
        loading.dismiss();
      }
    )
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

 async editarcliente(datos:any){
    this.clientes=datos;
    const alert = await this.alertController.create({
     
     header: 'Editar cliente',
     message: 'Dese editar el cliente',
     inputs: [
       {
         name: 'EMAIL',
         placeholder: 'Ingrese Email de cliente',
        
         label:"Email de cliente"
       },
       {
        name: 'NAME',
        placeholder: 'Ingrese Nombre de cliente',
       
        label:" Nombre de cliente"
      },

     ],
     buttons: [
      {
         text: 'Editar',
         cssClass:'primary',
         handler: (data) => {
           
           if(data.EMAIL!='') this.clientes.EMAIL=data.EMAIL;
           if(data.NAME!='')this.clientes.NAME=data.NAME;
           this.clientsService.update(this.clientes).subscribe(
             response=>{
              if(response.code=='200'){
                this.presentToast('Usuario editado correctamente');
                this.getclientsbycompany();
              }
             },error=>{

             }
           );
           



         }
       }
     ]
   });

   await alert.present();

  }
  async eliminarcliente(datos:any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Cliente!',
      message: 'Desea eliminar el cliente',
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
                this.clientsService.delete(datos).subscribe(
                  response=>{
                    if(response.code==200){
                      this.getclientsbycompany();
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

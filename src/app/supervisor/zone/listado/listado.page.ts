import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone';
import { ZoneServiceService } from 'src/app/services/zone-service.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ClientsService } from 'src/app/services/ClientsService.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  public zonas:Zone;
  public zones:any;
  public idcompany=localStorage.getItem('IDCOMPANY');
  public clientes:any;
  constructor(
    private zonasService:ZoneServiceService,
    private loadingController:LoadingController,
    private clientService:ClientsService,
    private alertController:AlertController,
    private toastController:ToastController

  ) { 

    this.zonas=new Zone('','','',this.idcompany!);
  }

  ngOnInit() {
    this.consultar();
    this.getClients();
  }
  getClients(){ 
    this.clientService.clientsearchbycompay(this.zonas).subscribe(
      response=>{
        if(response.code=='200'){
          this.clientes=response.data;
        }
      },error=>{

      }
    )
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  async getZonas(){
        
    var message="Obteniendo zonas ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.zonasService.getzonebycompany(this.zonas).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          this.zones=response.data;
        }
        
      },error=>{
        loading.dismiss();
      }
    )
  }
  async editarzona(datos:any){  
    console.log(datos);
    this.zonas.ID=datos.ID;
    
    const alert = await this.alertController.create({
     
      header: 'Editar Zona',
      message: 'Dese editar la zona',
      inputs: [
        {
          name: 'NAME',
          placeholder: 'Ingrese nombre de zona',
         
          label:"Nombre de Zona"
        },
      
 
      ],
      buttons: [
       {
          text: 'Editar',
          cssClass:'primary',
          handler: (data) => {
            
           
            if(data.NAME!='')this.zonas.NAME=data.NAME;
            this.zonasService.update(this.zonas).subscribe(
              response=>{
               if(response.code=='200'){
                 this.presentToast('Zona editado correctamente');
                 this.consultar();
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
 async  eliminarzona(datos:any){
    this.zonas=datos;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Zona!',
      message: 'Desea eliminar la zona',
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
                this.zonasService.delete(this.zonas).subscribe(
                  response=>{
                      if(response.code=='200'){
                        
                        this.consultar();
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
  async consultar(){
 
    if(this.zonas.IDCLIENT=='TODOS' || this.zonas.IDCLIENT==''){
      this.getZonas();
    }else{
      var message="Obteniendo zonas ...";
      const loading=await this.loadingController.create({
        message:message,
        
      });
      
      this.zonasService.zonebyclient(this.zonas).subscribe(
        response=>{
          loading.dismiss();
          if(response.code=='200'){
            this.zones=response.data;
         
          }
        },error=>{

        }
      )
    }
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

import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/models/point';
import { PointService } from 'src/app/services/point.service';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  public point:Point;
  public idcompany=localStorage.getItem('IDCOMPANY');
  public puntos:any;
  constructor(
    private pointService:PointService,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private toastController:ToastController
  ) {
    this.point=new Point('',this.idcompany!,'','','0','0','','');
   }

  ngOnInit() {
    this.getpointbycompany();
  }

  async getpointbycompany(){
    var message="Mostrando Clientes ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.pointService.getpointbycompany(this.point).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          this.puntos=response.data;
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
  async editarpunto(us:any){
    const alert = await this.alertController.create({
     
      header: 'Editar punto de control',
      message: 'Dese editar el punto de control',
      inputs: [
        {
          name: 'NAME',
          placeholder: 'Ingrese el nombre del punto de control',
         
          label:"Nombre de punto de Control"
        },
        {
         name: 'CODE',
         placeholder: 'Ingrese codigo de punto de control',
        
         label:"Codigo de punto de Control"
       },
 
      ],
      buttons: [
       {
          text: 'Editar',
          cssClass:'primary',
          handler: (data) => {
            this.point.ID=us.ID;
            if(data.NAME!='') this.point.NAME=data.NAME;
            if(data.CODE!='')this.point.CODE=data.CODE;
            console.log(this.point)
             this.pointService.update(this.point).subscribe(
              response=>{
               if(response.code=='200'){
                  this.presentToast('Punto de control actualizado correctamente');
                  this.getpointbycompany();
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
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async eliminarpunto(us:any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Punto de Control!',
      message: 'Desea eliminar el punto',
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
                this.pointService.delete(us).subscribe(
                  response=>{
                    if(response.code==200){
                      this.getpointbycompany();
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
}

import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/models/point';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { ZoneServiceService } from 'src/app/services/zone-service.service';
import { PointService } from 'src/app/services/point.service';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public point:Point;
  public zonas:any;
  public clientes:any;
  public idcompany=localStorage.getItem('IDCOMPANY');
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private clientsService:ClientsService,
    private zoneService:ZoneServiceService,
    private pointService:PointService


  ) {
    this.point=new Point('',this.idcompany!,'','','','','','');
   }

  ngOnInit() {
    this.getClients();
  }

  async getClients(){
    var message="Consultando Clientes ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.clientsService.clientsearchbycompay(this.point).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          this.clientes=response.data;
        }
      },error=>{
        loading.dismiss();
        this.presentAlert('Error consultando clientes')
      }
    )
  }

  async getzonebyclient(){
    this.zonas='';
    var message="Consultando Zonas del Cliente ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.zoneService.zonebyclient(this.point).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          this.zonas=response.data;
        }

      },error=>{
        this.presentAlert('Error consultando zonas del cliente')
        loading.dismiss();
       
      }
    )
  }

  async registrar(formulario:any){
    var message="REgistrando Punto de Control ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.pointService.register(this.point).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          loading.dismiss();
        } this.presentAlert('Punto de Control Registrado Correctamente');
        formulario.reset();
      },error=>{
          loading.dismiss();
          this.presentAlert('Error registrando punto de control')
      }
    )
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro de Punto de Control',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }
}

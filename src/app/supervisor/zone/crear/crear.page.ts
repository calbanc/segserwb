import { Component, OnInit } from '@angular/core';

import { Company } from 'src/app/models/company';
import { Zone } from 'src/app/models/zone';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { AlertController,LoadingController } from '@ionic/angular';
import { ZoneServiceService } from 'src/app/services/zone-service.service';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public zonas:Zone;
  public clientes:any;
  public company:Company;
  public idcompany=localStorage.getItem('IDCOMPANY');
  constructor(
    private clientService:ClientsService,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private zonaService:ZoneServiceService
  ) {
    this.zonas=new Zone('','','',this.idcompany!);
    this.company=new Company('','');
   }

  ngOnInit() {
    this.getclientes();
  }

  async registrar(formulario:any){
    var message="Registrando Zona ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    console.log(this.zonas)
    this.zonaService.register(this.zonas).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          formulario.reset();
        }
      },error=>{
        loading.dismiss();
        this.presentAlert('Error registrando zona'+error);
      }
    )
  }

  getclientes(){  
    this.company.IDCOMPANY=this.idcompany!;
    this.clientService.clientsearchbycompay(this.company).subscribe(
      response=>{
        if(response.code=='200'){
          this.clientes=response.data;
        }
      },error=>{

      }
    )
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro de Zonas',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }

}

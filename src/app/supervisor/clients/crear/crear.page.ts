import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { AlertController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public cliente:Clients
  public hoy:Date=new Date();
  public idcompany=localStorage.getItem('IDCOMPANY');
  

  constructor(
    private clientService:ClientsService,
    private alertController:AlertController,
    private loadingController:LoadingController
  ) { 

    this.cliente=new Clients('','','','',this.hoy,this.idcompany!,'');
  }

  ngOnInit() {
    this.cliente.DATEINIT=this.hoy;
  }

 async registrar(formulario:any){
    
    var message="Registrando Cliente ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.clientService.register(this.cliente).subscribe(
      response=>{
        if(response.code=='200'){
          loading.dismiss();
          this.presentAlert('Cliente Registrado correctamente');
          formulario.reset();
        }
      },error=>{
        loading.dismiss();
        this.presentAlert('Error registrando cliente'+error.message)
      }
    )
  }
  fecha(event:any){
    
    
    this.cliente.DATEINIT=event.detail.value;
    
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro de Cliente',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }

}

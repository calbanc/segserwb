import { Component, OnInit } from '@angular/core';
import { Gs } from "../../models/gs";
import {GsServiceService} from "../../services/gs-service.service";
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {CrearPage} from "./crear/crear.page";

@Component({
  selector: 'app-guardias',
  templateUrl: './guardias.page.html',
  styleUrls: ['./guardias.page.scss'],
})
export class GuardiasPage implements OnInit {
  public guardias:Gs;
  public idcompany=localStorage.getItem('IDCOMPANY');
  public guardiass:any;

  constructor(
   private gsService:GsServiceService,
   private loadingController:LoadingController,
   private alertController:AlertController,
   private toastController:ToastController,
   private modalCtrl:ModalController

  ) {
    this.guardias=new Gs(0,'','','','','',0);
  }

  ngOnInit() {
    this.guardias.idcompany=this.idcompany!;
    this.getguardiasbycompany();
  }

   async getguardiasbycompany(){
     var message="Mostrando Guardias de Seguridad ...";
     const loading=await this.loadingController.create({
       message:message,

     });
     loading.present();
    this.gsService.serchbycompanyclient(this.guardias).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=='200'){
          console.log(response);
          this.guardiass=response.data;
        }
      },error => {

      }
    )
  }
  async abrirmodal(item){
    console.log('cliick en abrir modal')
    const modal=await this.modalCtrl.create({
      component: CrearPage,
      showBackdrop: true,
      backdropDismiss: false,
      componentProps:{
        datos:item,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.getguardiasbycompany();
      });
    return await modal.present();
  }




}

import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ClientsService } from '../services/ClientsService.service';
import { Clients } from '../models/clients';
import { Guards } from '../models/Guards';
import {formatDate} from '@angular/common';
import { GuardsService } from '../services/guards.service';
import { ModalController,LoadingController,AlertController } from '@ionic/angular';
import { MapaPage } from './mapa/mapa.page';
import  * as mapboxgl  from 'mapbox-gl';

@Component({
  selector: 'app-reporterondascliente',
  templateUrl: './reporterondascliente.page.html',
  styleUrls: ['./reporterondascliente.page.scss'],
})
export class ReporterondasclientePage implements OnInit {
  public cliente:Clients;
  public hoy:Date=new Date();
  public clienterespuesta:any;
  public guardias:Guards;
  public datos:any;
  
  public url;
  
  constructor(
    private clientService:ClientsService,
    private guardService:GuardsService,
    private modalController:ModalController,
    private loadingController:LoadingController,
    private alertController:AlertController
  ) { 
    this.cliente=new Clients('','','','',this.hoy,'','');
    this.guardias=new Guards(0,'','','','','','','','','','','','','1');
    this.url="../assets/rondas/";
  }

  ngOnInit() {
        
    const token=localStorage.getItem('TOKEN')!;
    this.guardias.DATE=formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en');
     
    console.log(this.guardias.DATE);
    if(token!=null) {
      const decodetoken=jwtDecode(token);
      
      this.cliente.ID=decodetoken['IDCLIENT'];
      //const isexpired= Date.now()>=jwtDecode(token).exp! *1000 ;
      
      this.buscarcliente();
    }
  }

  async buscarcliente(){
    var message="Cargando dato del  Cliente ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
      this.clientService.getclientbycode(this.cliente).subscribe(
        response=>{
          loading.dismiss();
          if(response.status=='success'){
            this.clienterespuesta=response.data[0].NAME;
            
          }
        },error=>{
          loading.dismiss();
          this.presentAlert('Error cargando cliente');
        }
      )
  }

  async buscarreporte(){
    var message="Buscando reportes del cliente ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.guardias.IDCLIENT=this.cliente.ID;
    this.guardias.IDCOMPANY=this.cliente.ID;
    this.guardService.serchbycompanyclientaprobados(this.guardias).subscribe(
      response=>{
        loading.dismiss();
        if(response.status=='ok'){
          this.datos=response.data;
        }
      },error=>{
        loading.dismiss();
        this.presentAlert('Error cargando informes del cliente');
        console.log(error);
      }
    )

  }
  fecha(as){
    this.guardias.DATE=as.detail.value;
  }

  async vermapa(data){
    
    const modal=await this.modalController.create({
      component: MapaPage,
      componentProps:{
        datos:data,
      }
    });
    await modal.present();
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Consulta de informe',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }

}

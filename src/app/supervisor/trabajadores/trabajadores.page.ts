import { Component, OnInit } from '@angular/core';

import { Company } from 'src/app/models/company';
import { trabajadores } from 'src/app/models/trabajadores';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { TrabajadoresServiceService } from 'src/app/services/trabajadores-service.service';
import {ConfirmationService, Message, MessageService} from "primeng/api";
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
  providers:[ MessageService,ConfirmationService]
})
export class TrabajadoresPage implements OnInit {
  public company:Company;
  public clients:any;
  public trabjadores:trabajadores
  public resttrabajadores:any;
  public loading:boolean=false;
  public editing:boolean=false;
  public visible:boolean=false;
  constructor(
    private trabajadoresService:TrabajadoresServiceService,
    private clientService:ClientsService,
    private loadingController:LoadingController,
    private alertController:AlertController
    
  ) { 

    this.company=new Company('1','');
    this.trabjadores=new trabajadores(0,'','','','','','','','');
    
  }

  ngOnInit() {
    
    this.getclients();
  }
  openNew(trab?:any,edit?:boolean){
    
 
    this.visible=true;
    this.loading=false;
    if(trab.rut!=''){
      this.editing=edit!;
      this.trabjadores=new trabajadores(trab.idcliente,trab.rut,trab.apellidopaterno,trab.apellidomaterno,trab.nombres,trab.cargo,trab.area,trab.nfc,trab.qr);
    }



    
    
  }

  async gettrabajadores(){

  }
  async getclients(){
    var message="Cargando clientes ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.clientService.clientsearchbycompay(this.company).subscribe(
      response=>{
        loading.dismiss();
        if(response.code==200){
          this.clients=response.data
        }
      },error=>{
        loading.dismiss();
      }

    )
  }

  async mostrartrabajadores(){
    var message="Cargando trabajadores ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.trabajadoresService.getbyclient(this.trabjadores).subscribe(
      response=>{
        loading.dismiss();
        if(response.code==200){
          this.resttrabajadores=response.trabajdores
        }
        
      }
    )
  }
  async eliminartrabajador(){
    this.trabajadoresService.delete(this.trabjadores).subscribe(
      response=>{
        if(response.code==200){
          this.mostrartrabajadores()
          this.visible=false
        }
      }
    )
  }
  async edittrabajador(){
    var message="Editando trabajador ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.trabajadoresService.updatetrabajador(this.trabjadores).subscribe(
      response=>{
        loading.dismiss();
        if(response.code==200){
          this.visible=false;
          this.mostrartrabajadores();
        }
      },error=>{
        console.log(error); 
      }
    )
  }
  async savetrabajador(event:Event){
    var message="Guardando trabajador ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
    loading.present();
    this.trabajadoresService.save(this.trabjadores).subscribe(
      response=>{
        loading.dismiss();
        if(response.code==200){
          this.visible=false;
          this.mostrartrabajadores();
        }
      },error=>{
        loading.dismiss();
      }
    )
  }
  abrirmodal(){
    this.visible=true;
  }
}

import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients';

import { Guards } from 'src/app/models/Guards';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { Company } from 'src/app/models/company';
import { GuardsService } from 'src/app/services/guards.service';
import { LoadingController,AlertController } from '@ionic/angular';

import * as html2pdf  from 'html2pdf.js';
import { Guardias } from 'src/app/models/Guardias';

@Component({
  selector: 'app-tecnicalreport',
  templateUrl: './tecnicalreport.page.html',
  styleUrls: ['./tecnicalreport.page.scss'],
})
export class TecnicalreportPage implements OnInit {
  public idcompany=localStorage.getItem('IDCOMPANY');
  public guardia:Guards;
  public clients:any;
  public company:Company;
  public datos:any;
  public url:string;
  public nombrecliente:any;
  public datereport:any;
  public desde:Date|undefined;
  public hasta:Date|undefined;
  constructor(
    private clientService:ClientsService, 
    private guardiService:GuardsService,
    private laoadingController:LoadingController,
    private alertController:AlertController
  ) {
    this.company=new Company('','');
    this.guardia=new Guards(0,'','','','','','','','','','','','','');
    this.url="../assets/rondas/";
   }

  ngOnInit() {
    this.getclients();
  }
  getclients(){
    this.company.IDCOMPANY=this.idcompany!;
    this.clientService.clientsearchbycompay(this.company).subscribe(
      response=>{
       
        if(response.code=="200"){
            this.clients=response.data;
        }
        
      }
    )
  }
  
  async  buscar(e:any){
    
      
      this.guardia.DATE=this.date_TO_String(this.desde);
      this.guardia.TIME=this.date_TO_String(this.hasta);


    if(this.guardia.IDCLIENT==''||this.desde==null||this.hasta==null){
      this.presentAlert('Debe selecionar una fecha y un cliente')
    }else{
      var message="Mostrando Informe ...";
      const loading=await this.laoadingController.create({
        message:message,  
        
      });
      loading.present();
      if(e=="1")this.guardia.VALIDADO='1';
      if(e=="0")this.guardia.VALIDADO='0';
      if(e=="2")this.guardia.VALIDADO='TODOS';
      this.guardia.IDCOMPANY=this.idcompany!;
  
      this.guardiService.serchbycompanyclientdateaprobados(this.guardia).subscribe(
        response=>{
          loading.dismiss();
          if(response.code=="200"){
            this.datos=response.data;
            this.nombrecliente=response.data[0].N0MBRECLIENTE;
            this.datereport=response.data[0].DATE
  
          }
        },error=>{
          loading.dismiss();
       
          this.presentAlert('Error consultando clientes')
        }
      )
  
    } 
        


  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'informe tecnico de guardia',
      message: message,
      buttons: ['OK']
    });

    return await alert.present();
  }
  descargar(){
    const element=document.getElementById('data-to-export')!;
  
    const options={

      filename:'reporterondas.pdf',

      margin:       1,
      image:{type:'png'},
      html2canvas:{},

      jsPDF:{orientaion:'porland'}

    }
   
    html2pdf().from(element).set(options).save(); 


  }
   date_TO_String(date_Object: Date|undefined): string {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    let date_String: string =
      date_Object!.getFullYear() +
      "/" +
      (date_Object!.getMonth() + 1) +
      "/" +
      +date_Object!.getDate() +
      "T" +
      +date_Object!.getHours() +
      ":" +
      +date_Object!.getMinutes();
    return date_String;
  }
 async  notificar(){
    this.guardia.DATE=this.date_TO_String(this.desde);
      this.guardia.TIME=this.date_TO_String(this.hasta);


    if(this.guardia.IDCLIENT==''||this.desde==null||this.hasta==null){
      this.presentAlert('Debe selecionar una fecha y un cliente')
    }else{
      var message="Mostrando Informe ...";
      const loading=await this.laoadingController.create({
        message:message,  
        
      });
      loading.present();
      this.guardia.VALIDADO='1';
      this.guardia.IDCOMPANY=this.idcompany!;
  
      this.guardiService.sendemail(this.guardia).subscribe(
        response=>{
          loading.dismiss();
          if(response.code=="200"){
          
            this.presentAlert('Emails enviados correctamente al cliente')
  
          }
        },error=>{
          loading.dismiss();
       
          this.presentAlert('Error consultando clientes')
        }
      )
  
    } 
        
  }
}

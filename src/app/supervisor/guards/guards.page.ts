import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients';

import { Guards } from 'src/app/models/Guards';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { Company } from 'src/app/models/company';
import { GuardsService } from 'src/app/services/guards.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-guards',
  templateUrl: './guards.page.html',
  styleUrls: ['./guards.page.scss'],
})
export class GuardsPage implements OnInit {
  public idcompany=localStorage.getItem('IDCOMPANY');
  public guardia:Guards;
  public clients:any;
  public company:Company;
  public datos:any;
  public url:string;
  constructor(
    private clientService:ClientsService,
    private guardiService:GuardsService,
    private laoadingController:LoadingController
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
  fecha(e:any){
    this.guardia.DATE=e.detail.value;
  }
 async  buscar(e:any){

        
    var message="Mostrando Clientes ...";
    const loading=await this.laoadingController.create({
      message:message,
      
    });
    loading.present();
    if(e=="1")this.guardia.VALIDADO='1';
    if(e=="0")this.guardia.VALIDADO='0';
    if(e=="2")this.guardia.VALIDADO='TODOS';
    this.guardia.IDCOMPANY=this.idcompany!;

    this.guardiService.serchbycompanyclient(this.guardia).subscribe(
      response=>{
        loading.dismiss();
        if(response.code=="200"){
          this.datos=response.data;
        }
      },error=>{
        loading.dismiss();
      }
    )


  }

  aprobar(dato:any){

    this.guardia.VALIDADO="1";
    this.guardia.ID=dato.ID;
    this.guardiService.update(this.guardia).subscribe(
      response=>{
        if(response.code=='200'){
          this.buscar("1");
        }
      },error=>{

      }
    )
    
  }
  
  noaprobar(dato:any){

    this.guardia.VALIDADO="0";
    this.guardia.ID=dato.ID;
    this.guardiService.update(this.guardia).subscribe(
      response=>{
        if(response.code=='200'){
          this.buscar(0); 
        }
      },error=>{

      }
    )
    
  }
  notificar(){
    
  }
}

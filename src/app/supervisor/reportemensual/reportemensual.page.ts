import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { Reportmes } from 'src/app/models/reportmes';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { GuardsService } from 'src/app/services/guards.service';

@Component({
  selector: 'app-reportemensual',
  templateUrl: './reportemensual.page.html',
  styleUrls: ['./reportemensual.page.scss'],
})
export class ReportemensualPage implements OnInit {
  public informemes:Reportmes
  public company:Company;
  public clients:any;
  public guardias:any;
  constructor(
        private clientService:ClientsService,
        private loadingController:LoadingController,
        private alertController:AlertController,
        private guardasService:GuardsService
  ) {
    this.company=new Company('1','');
    this.informemes=new Reportmes('','','');
   }

  ngOnInit() {
    this.getclients();
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

  async mostrarreporte(){
    var message="Cargando registros ...";
    const loading=await this.loadingController.create({
      message:message,
      
    });
   // loading.present();
    this.guardasService.pdf().subscribe(
      response=>{
        var blob = new Blob([response], {type: "application/pdf"});
        console.log(blob);
      }
    );


     this.guardasService.reportemes(this.informemes).subscribe(
      response=>{
        loading.dismiss();
        if(response.code==200){
          loading.dismiss();
          this.guardias=response.guardias;
          
        }
      },error=>{
        loading.dismiss();
      }
    ); 
  }
  descargar(){
    
  }
  
}

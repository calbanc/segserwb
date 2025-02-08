import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { Informeaccesotrabajadores } from 'src/app/models/informeaccesotrabajadores';
import { trabajadores } from 'src/app/models/trabajadores';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { InformetrabajadoresService } from 'src/app/services/informetrabajadores.service';
import { TrabajadoresServiceService } from 'src/app/services/trabajadores-service.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-informetrabajadores',
  templateUrl: './informetrabajadores.page.html',
  styleUrls: ['./informetrabajadores.page.scss'],
})
export class InformetrabajadoresPage implements OnInit {
  public company:Company;
  public clients:any;
  public trabjadores:trabajadores
  public resttrabajadores:any;
  public loading:boolean=false;
  public editing:boolean=false;
  public visible:boolean=false;
  public informe:Informeaccesotrabajadores;
  date1:Date|undefined;
  public responsetrabajadores;
  constructor(
    private informeaccesoService:InformetrabajadoresService,
    private clientService:ClientsService,
    private loadingController:LoadingController,
    private alertController:AlertController
    
  ) { 

    this.company=new Company('1','');
    this.trabjadores=new trabajadores(0,'','','','','','','','');
    this.informe=new Informeaccesotrabajadores('','');
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

  async mostrartrabajadores(){
    var str = this.informe.fecha_ingreso; 
    this.informe.fecha_ingreso=this.date1!.toISOString().split('T')[0] ;
    this.informeaccesoService.getworkersaccesbydate(this.informe).subscribe(
      response=>{
        if(response.code==200){
          this.responsetrabajadores=response.listaccesos;
        }
      },error=>{

      }
    )
    
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.responsetrabajadores);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'controles');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}

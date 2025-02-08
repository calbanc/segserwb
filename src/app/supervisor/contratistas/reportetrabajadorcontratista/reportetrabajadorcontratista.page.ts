import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { Informeaccesotrabajadores } from 'src/app/models/informeaccesotrabajadores';
import { ClientsService } from 'src/app/services/ClientsService.service';
import { ContratistastrabajadoresService } from 'src/app/services/contratistastrabajadores.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-reportetrabajadorcontratista',
  templateUrl: './reportetrabajadorcontratista.page.html',
  styleUrls: ['./reportetrabajadorcontratista.page.scss'],
})
export class ReportetrabajadorcontratistaPage implements OnInit {
  public company:Company;
  public clients:any;
  public informe:Informeaccesotrabajadores;
  public responsetrabajadores:any;
  date1:Date|undefined;
  constructor(
    private loadingController:LoadingController,
    private clientService:ClientsService,
    private contratistastrabajadoresService:ContratistastrabajadoresService
  ) { 
    this.company=new Company('1','');
    this.informe=new Informeaccesotrabajadores('','');
    
  }

  ngOnInit() {
    this.getclients()
  }
  mostrartrabajadores(){
    var str = this.informe.fecha_ingreso; 
    this.informe.fecha_ingreso=this.date1!.toISOString().split('T')[0] ;
    this.contratistastrabajadoresService.getregistrosaccesocontratistadate(this.informe).subscribe(
      response=>{
        if(response.code==200){
          this.responsetrabajadores=response.accesocontratista;
        }
      },error=>{

      }
    )
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

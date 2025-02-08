import { Component, OnInit } from '@angular/core';
import {Guards} from "../../models/Guards";
import {ControlAcceso} from "../../models/controlacceso";
import {ClientsService} from "../../services/ClientsService.service";
import {ControlAccesoServiceService} from "../../services/ControlAccesoService.service";
import {Company} from "../../models/company";
import {Zone} from "../../models/zone";
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx/xlsx.mjs';

@Component({
  selector: 'app-controlacceso',
  templateUrl: './controlacceso.page.html',
  styleUrls: ['./controlacceso.page.scss'],
})
export class ControlaccesoPage implements OnInit {
  public clients:any;
  public control:ControlAcceso;
  public company:Company;
  public idcompany=localStorage.getItem('IDCOMPANY');
  public zone:Zone;
  public controles:ControlAcceso[]=[];
  constructor(
    private clientService:ClientsService,
    private controlAccesoService:ControlAccesoServiceService

  ) {
    this.zone=new Zone('','','','');
    this.control=new ControlAcceso(this.idcompany!,'','','','','','','','','','','','','','','','','','','','',this.zone);
    this.company=new Company('','');
  }

  ngOnInit() {
    this.getclients();
  }
  buscar(){
    console.log(this.control)
    this.controlAccesoService.getvisitabyidclientdate(this.control).subscribe(
      response=>{

          this.controles=response.data;

      },error => {

      }
    )
  }
  fecha(event){
    this.control.FECHAINGRESO=event.detail.value;
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
 /* exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.products);
        doc.save('products.pdf');
      });
    });
  }*/

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.controles);
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

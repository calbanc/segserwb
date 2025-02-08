import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';
@Injectable({
  providedIn: 'root'
})
export class ContratistastrabajadoresService {
  public url:string;
  public token:string="";
  public company:string="";
  
  constructor(
    public _http:HttpClient,

  ) {
    this.url=global.url;
  }

  getregistrosaccesocontratistadate(data:any):Observable<any>{

    
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'accesocontratistas/getregistrosaccesocontratistadate',params,{headers:headers});
  }
}

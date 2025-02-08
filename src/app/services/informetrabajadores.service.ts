import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InformetrabajadoresService {
  public url: string;
  public token: string = "";
  public company: string = "";

  constructor(
    public _http: HttpClient,

  ) {
    this.url = global.url;
  }

  

  getworkersaccesbydate(data:any):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'accesotrabajadores/getworkersaccesbydate',params,{headers:headers});
  }
  gettoken(){
    let token=localStorage.getItem('TOKEN');
    if(token && token!="undefined"){
      this.token=token;
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrabajadoresServiceService {

  public url:string;
  public token:string="";
  public company:string="";
  constructor(
    public _http:HttpClient,

  ) {
    this.url=global.url;
    this.gettoken();
  }
  gettoken(){
    let token=localStorage.getItem('TOKEN');
    if(token && token!="undefined"){
      this.token=token;
    }
  }
  getbyclient(data:any):Observable<any>{
    
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'trabajadores/getbyclient',params,{headers:headers});
  }
  updatetrabajador(data:any):Observable<any>{
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'trabajadores/update',params,{headers:headers});
 
  }
  save(data:any):Observable<any>{
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'trabajadores/create',params,{headers:headers});
  }

  delete(data:any):Observable<any>{
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'trabajadores/delete',params,{headers:headers});
  }
  
}

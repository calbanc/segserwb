import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';
import { Company } from '../models/company';
import { Guardias } from '../models/Guardias';
import { Guards } from '../models/Guards';
import { Reportmes } from '../models/reportmes';
@Injectable({
  providedIn: 'root'
})
export class GuardsService {
  public url:string;
  public token:string="";
  public company:string="";
  constructor(
    public _http:HttpClient,
      
  ) {
    this.url=global.url;
  }
  gettoken(){
    let token=localStorage.getItem('TOKEN');
    if(token && token!="undefined"){
      this.token=token;
    }
  }
  serchbycompanyclientdateaprobados(data:any):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/serchbycompanyclientdateaprobados',params,{headers:headers});
  }

  serchbycompanyclient(data:any):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/serchbycompanyclient',params,{headers:headers});
  }
  serchbycompanyclientaprobados(data:Guards):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/serchbycompanyclientaprobados',params,{headers:headers});
  }
  update(data:Guards):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/update',params,{headers:headers});
    
  }
  sendemail(data:Guards):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'sendemail',params,{headers:headers});
    
  }

  reportemes(data:Reportmes):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/reportemes',params,{headers:headers});
    
  }
  

  pdf():Observable<any>{

    return this._http.get(this.url+'guards/pdf');
    
  }
  
}


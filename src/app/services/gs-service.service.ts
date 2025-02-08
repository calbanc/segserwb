import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {global} from "./global";
import {Guards} from "../models/Guards";
import {Observable} from "rxjs";
import {Gs} from "../models/gs";
import {Imagegs} from "../models/imagegs";

@Injectable({
  providedIn: 'root'
})
export class GsServiceService {
  public url: string;
  public token: string = "";
  public company: string = "";

  constructor(
    public _http: HttpClient,

  ) {
    this.url = global.url;
  }

  gettoken() {
    let token = localStorage.getItem('TOKEN');
    if (token && token != "undefined") {
      this.token = token;
    }
  }
  serchbycompanyclient(data:Gs):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'gs/getgsbycompany',params,{headers:headers});
  }
  getguardiabyid(data:Gs):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'gs/getguardiabyid',params,{headers:headers});
  }

  delete(data:Gs):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'gs/delete',params,{headers:headers});
  }

  register(data:Gs):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'gs/register',params,{headers:headers});
  }
  update(data:Gs):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'gs/update',params,{headers:headers});
  }
  enviarfoto(data:Imagegs):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Auth',this.token);
    return this._http.post(this.url+'gs/enviarfoto',params,{headers:headers});
  }


}

import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';

import { Company } from '../models/company';
import { Clients } from '../models/clients';
import { Zone } from '../models/zone';
@Injectable({
  providedIn: 'root'
})
export class ZoneServiceService {
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
  getzonebycompany(data:Zone):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'zone/getzonebycompany',params,{headers:headers});

  }
  register(data:Zone):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'zone/register',params,{headers:headers});

  }
  zonebyclient(data:Zone):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'zone/getzonebyclient',params,{headers:headers});

  }

  delete(data:Zone):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'zone/delete',params,{headers:headers});

  }
  
  update(data:Zone):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'zone/update',params,{headers:headers});

  }
  


}


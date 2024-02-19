import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';
import { Point } from '../models/point';
@Injectable({
  providedIn: 'root'
})
export class PointService {
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

  getpointbycompany(data:Point):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'point/getpointbycompany',params,{headers:headers});

  }
  register(data:Point):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'point/create',params,{headers:headers});

  }
  delete(data:Point):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'point/delete',params,{headers:headers});

  }
  update(data:Point):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'point/update',params,{headers:headers});

  }
}

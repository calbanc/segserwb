import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';
import { Company } from '../models/company';
import { Guards } from '../models/Guards';
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


  serchbycompanyclient(data:Guards):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/serchbycompanyclient',params,{headers:headers});
  }
  update(data:Guards):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'guards/update',params,{headers:headers});
    
  }
}


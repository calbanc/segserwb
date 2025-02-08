import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';
import { Usuario } from '../models/usuario';
import { Company } from '../models/company';
import { Role } from '../models/role';
import { Clients } from '../models/clients';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
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

  register(data:Clients):Observable<any>{

    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'clients/register',params,{headers:headers});

  }


  clientsearchbycompay(data:Company):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'clients/searchbycompany',params,{headers:headers});

  }
  
  getclientbycode(data:Clients):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'clients/findclient',params,{headers:headers});

  }
  delete(data:Clients):Observable<any>{
  
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'clients/delete',params,{headers:headers});
  }
  update(data:Clients):Observable<any>{
  
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'clients/update',params,{headers:headers});
  }
}

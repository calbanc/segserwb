import { Injectable } from '@angular/core';
import { Observable, observable} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { global } from './global';
import { Usuario } from '../models/usuario';
import { Company } from '../models/company';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:string;
  public token:string="";
  public company:string="";
  constructor(
    public _http:HttpClient,

  ) {
    this.url=global.url;
  }
  login(data:Usuario):Observable<any>{
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'login',params,{headers:headers});
  }

  gettoken(){
    let token=localStorage.getItem('TOKEN');
    if(token && token!="undefined"){
      this.token=token;
    }
  }

  getcompany(){
    let company=localStorage.getItem('IDCOMPANY');
    if(company && company!="undefined"){
      this.company=company;
    }
  }
  getuser(data:Usuario):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'user/getuser',params,{headers:headers});

  }
  getrolebycompany(data:Company):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'role/getrolesbycompany',params,{headers:headers});

  }

  registeruser(data:Usuario):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'user/register',params,{headers:headers});

  }
  getuserbycompany(data:Usuario):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'user/getuserbycompany',params,{headers:headers});

  }
 
  deleteuser(data:Usuario):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'user/delete',params,{headers:headers});

  }
 
  updateuser(data:Usuario):Observable<any>{
    this.gettoken();
    let json=JSON.stringify(data);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                .set('Auth',this.token);
    return this._http.post(this.url+'user/updateuser',params,{headers:headers});

  }
}

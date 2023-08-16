import { Injectable } from '@angular/core';
import { Activity } from '../Models/activity';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbActivitys {

  _URL: string ="http://localhost:3000/api/activitys/"

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) {
  }

  obtenerActs(){
    return this.http.get<Activity[]>(this._URL);
  }

  crearAct(activity:Activity){
    return this.http.post<any>(this._URL,activity);
  }

  updateAct(id:string, activity: Activity){
    return this.http.put<any>(`${this._URL}${id}`, activity, { headers: this.httpHeaders })
  }

  eliminateAct(id: string){
    return this.http.delete<any>(`${this._URL}${id}`, { headers: this.httpHeaders })
  }

  updateEstAct(id:string, estado:number){
    let today : Date = new Date();
    return this.http.put<any>(`${this._URL}state/${id}`, {stateActivity: estado, setTime: today}, { headers: this.httpHeaders })
  }

  asignateUser(user:string, idActivity: string){
    return this.http.put<any>(`${this._URL}asignate/${idActivity}`, {userAsignado: user}, {headers: this.httpHeaders})
  }

  
}

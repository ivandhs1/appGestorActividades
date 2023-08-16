import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class DbUsersService {

  _URL: string ="http://localhost:3000/api/users/"

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  obtenerUsers(){
    return this.http.get<User[]>(this._URL);
  }

  verificateUser(email:string){
    return this.http.get(`${this._URL}verificate/${email}`);
  }

  crearUser(user:User){
    return this.http.post<any>(this._URL,user);
  }

  updateUser(){

  }

  obtenerUser(){

  }
}

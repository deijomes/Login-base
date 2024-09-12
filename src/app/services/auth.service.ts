import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:44307'

  token : string;


  constructor( private http : HttpClient) { 

    this.leerToken();
  }


  logaut(){

    this.token = '';
    localStorage.removeItem('token');

  }


  login(usuario: UsuarioModel): Observable<any> {
    
    const authdata = {
      Emmail: usuario.emmail,
      password: usuario.password
    };

    return this.http.post(`${this.url}/api/cuentas/Login`, authdata)
     .pipe(map((response: any) => {
       
        console.log('entro en el rxjs')
        // Guarda el token en el local storage o en un servicio de autenticación
        
        this.guardarToken(response['token'])
        return response;
      })
    );
  }
  
  nuevoUsuario(usuario: UsuarioModel){

    const authdata = {
      emmail: usuario.emmail,
      password : usuario.password
      
    }
    return this.http.post(`${this.url}/api/cuentas/registrar`, authdata)
    .pipe(
      map((response: any) => {
       
        console.log('entro en el rxjs')
        // Guarda el token en el local storage o en un servicio de autenticación
        
        this.guardarToken(response['token'])
        return response;
      
      })
    )}


  guardarToken(token : string){
   this.token = token;
   localStorage.setItem('token',token)
  }

  leerToken() {
    this.token = localStorage.getItem('token') || '';
  }

  estaAutenticado(): boolean {
    return this.token && this.token.length > 2;
  }

  
}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { enviroments } from '../../enviroments/enviroments';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, Observable, tap, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { CargaUsuario } from '../interfaces/carga-usuario.interface';

declare const google: any;

const base_url = enviroments.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private Http: HttpClient,
    private router: Router
  ) {}

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }

    } 
      
  }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('correo', () => {
      this.router.navigateByUrl('/login');

    });
  }

  validarToken(): Observable<boolean>{

    return this.Http.get(`${base_url}/login/renew`, {headers:  {
      'x-token': this.token
    }}).pipe(
      tap((resp: any) => {
        const {
          nombre,
          email,
          role,
          uid,
          google,
          img
        } = resp.usuario

        this.usuario = new Usuario(nombre, email, google, role, uid, img);
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  crearUsuario(data: RegisterForm){

    return this.Http.post(`${base_url}/usuarios`, data).pipe(
      tap((resp : any) => {localStorage.setItem('token', resp.token)})
    );
  }

  loginUsuario(data: LoginForm){
    return this.Http.post(`${base_url}/login`, data).pipe(
      tap((resp: any) => {localStorage.setItem('token', resp.token)})
    );
  }

  loginGoogle(token : string){
    return this.Http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp: any) => {console.log(resp)})
    )
  }

  actualizarUsuario(data: {nombre: string, email: string}){
    return this.Http.put(`${base_url}/usuarios/${this.usuario.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  obtenerUsuarios(desde: number = 0){
    return this.Http.get<CargaUsuario>(`${base_url}/usuarios/?desde=${desde}`, this.headers)
  }
}

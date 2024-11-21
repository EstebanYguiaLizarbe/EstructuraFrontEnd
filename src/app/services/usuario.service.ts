import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { enviroments } from '../../enviroments/enviroments';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, Observable, tap, of, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { CargaUsuario } from '../interfaces/carga-usuario.interface';
import { Store } from '@ngrx/store';
import { apareceBarra, apareceSpinner, desaparece } from '../store/loading.reduce';

declare const google: any;

const base_url = enviroments.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private Http: HttpClient,
    private router: Router,
    private store: Store<{ loading: boolean }>
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

  get role(){
    return this.usuario.role;
  }

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }

  get uid():string {
    return this.usuario.uid || '';
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
    // google.accounts.id.revoke('correo', () => {


    // });
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
        this.guardarLocalStorage( resp.token, resp.menu );
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  crearUsuario(data: RegisterForm){

    return this.Http.post(`${base_url}/usuarios`, data).pipe(
      tap((resp : any) => {this.guardarLocalStorage( resp.token, resp.menu );})
    );
  }

  loginUsuario(data: LoginForm){
    return this.Http.post(`${base_url}/login`, data).pipe(
      tap((resp: any) => {this.guardarLocalStorage( resp.token, resp.menu );})
    );
  }

  loginGoogle(token : string){
    return this.Http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp: any) => {console.log(resp)})
    )
  }

  actualizarUsuario(data: {nombre: string, email: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role
    }

    this.store.dispatch(apareceBarra());
    return this.Http.put(`${base_url}/usuarios/${this.usuario.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      finalize(() => this.store.dispatch(desaparece()))
    );
  }

  obtenerUsuarios(desde: number = 0){
    this.store.dispatch(apareceBarra());

    return this.Http.get<CargaUsuario>(`${base_url}/usuarios/?desde=${desde}`, this.headers).pipe(
      map( resp => {
        const usuarios = resp.usuarios.map( 
          user => new Usuario(user.nombre, user.email, user.google, user.role, user.uid, user.img, "" )  
        );
        return {
          total: resp.total,
          usuarios
        };
      }),
      finalize(() => this.store.dispatch(desaparece()))
    );
  }

  eliminarUsuario( usuario: Usuario ) {
    
    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.Http.delete( url, this.headers );
  }


  guardarUsuario( usuario: Usuario ) {

    return this.Http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

  }

}

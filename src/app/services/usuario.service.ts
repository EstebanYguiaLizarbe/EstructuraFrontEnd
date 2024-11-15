import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { enviroments } from '../../enviroments/enviroments';

const base_url = enviroments.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private Http: HttpClient
  ) { }

  crearUsuario(data: RegisterForm){

    return this.Http.post(`${base_url}/usuarios`, data);

  }
}

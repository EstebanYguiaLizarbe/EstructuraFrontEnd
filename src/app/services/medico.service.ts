import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { map, Observable } from 'rxjs';
import { Medico } from '../models/Medico';
import { HttpClient } from '@angular/common/http';

const base_url = enviroments.base_url;

interface MedicoResponse { ok: boolean; medicos: Medico[]};

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarMedicos()  {

    const url = `${ base_url }/medicos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: any) => resp.medicos )
              );
  }

  obtenerMedicoPorId( id: string ) {

    const url = `${ base_url }/medicos/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: any) => resp.medico )
              );
  }

  crearMedico( medico: { nombre: string, hospital: string } ) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico, this.headers );
  }
  
  actualizarMedico( medico: Medico  ) {

    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url, medico, this.headers );
  }

  borrarMedico( _id: string ) {

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}

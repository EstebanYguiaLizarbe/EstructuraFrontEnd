import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { Usuario } from '../models/Usuario';
import { map } from 'rxjs';
import { Medico } from '../models/Medico';
import { Hospital } from '../models/Hospital';

const base_url = enviroments.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  busquedaGlobal( termino: string ) { 
    const url = `${ base_url }/todo/${ termino }`;
    return this.http.get<any[]>( url, this.headers );
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, user.google, user.role, user.uid, user.img, "" )  
    );
  }

  private transformarHospitales( resultados: any[] ): Hospital[] {
    return resultados;
  }

  private transformarMedicos( resultados: any[] ): Medico[] {
    return resultados;
  }

  buscar( 
      tipo: 'usuarios'|'medicos'|'hospitales',
      termino: string
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => { 

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  case 'hospitales':
                    return this.transformarHospitales( resp.resultados )
  
                  case 'medicos':
                      return this.transformarMedicos( resp.resultados )
                
                  default:
                    return [];
                }

              })
            );

  }
}

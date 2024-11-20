import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { map, tap } from 'rxjs';
import { Hospital } from '../models/Hospital';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { aparece, desaparece } from '../store/loading.reduce';

const base_url = enviroments.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  
  constructor( private http: HttpClient,
    private store: Store<{ loading: boolean }>
   ) { }

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


  cargarHospitales() {

    const url = `${ base_url }/hospitales`;

    this.store.dispatch(aparece());
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp:any) => resp.hospitales ),
                tap( (resp: any) => this.store.dispatch(aparece())),
                
              );
  }

  crearHospital( nombre: string = "" ) {

    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { nombre }, this.headers );
  }
  
  actualizarHospital( _id: string = "", nombre: string = "" ) {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarHospital( _id: string = "" ) {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}

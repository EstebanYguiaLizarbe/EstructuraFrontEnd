import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';

const base_url = enviroments.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFot(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string){

    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formDat = new FormData();

      formDat.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formDat
      })

      const data = await resp.json();
      // console.log(resp);

      if(data.ok){
        return data.nombreArchivo;
      } else{
        return false;
      }

    } catch (error) {
      console.log(error, "soy el error");
    }
  }
}

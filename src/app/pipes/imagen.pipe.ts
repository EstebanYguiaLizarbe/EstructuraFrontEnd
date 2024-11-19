import { Pipe, PipeTransform } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';

const base_url = enviroments.base_url;

@Pipe({
  name: 'imagen',
  standalone: true
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if ( !img ) {
      return `${ base_url }/upload/usuarios/no-image`;
  } else if ( img.includes('https') ) {
      return img;
  } else if ( img ) {
      return `${ base_url }/upload/${ tipo }/${ img }`;
  } else {
    return `${ base_url }/upload/usuarios/no-image`;
  }
  }

}
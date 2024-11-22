import { environment } from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public google: boolean,
        public role: string,
        public uid: string,
        public img?: string,
        public password?: string,
    ){

    }

    // get imagenUrl(){
    //     if(this.img){
            //De prueba hasta que tenga el backend
            // return '/assets/images/profile/user-1.jpg';


        //     return `${base_url}/upload/usuarios/${this.img}`;
        // } else {

            //De prueba hasta que tenga el backend
            // return '/assets/images/profile/user-1.jpg';

            //Cambiar por la url de la imagen por defecto
            // return `${base_url}/upload/usuarios/image-not-found`;
    //     }
    // }

    get imagenUrl() {

        if ( !this.img ) {
            return '/assets/images/profile/user-1.jpg';
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return '/assets/images/profile/user-1.jpg';
        }
    }

}
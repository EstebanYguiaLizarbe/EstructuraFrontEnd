import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../../app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/dash-prd-1.jpg',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/dash-prd-2.jpg',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/dash-prd-3.jpg',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/dash-prd-4.jpg',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy{
  public totalUsuarios: number = 0;
  // public usuarios: Usuario[] = [];
  public usuarios: any[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number= 0;
  public cargando: boolean = false;
  public imgSubs !: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImageService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.imgSubs = this.modalImageService.nuevaImagen.subscribe( img => this.obtenerUsuarios() );
  }
  
  obtenerUsuarios(){
    this.cargando = true;

    this.usuarioService.obtenerUsuarios(this.desde).pipe(delay(100)).
    subscribe(({total, usuarios}) => {
      console.log(usuarios, "users")
      this.totalUsuarios = total;

      if(usuarios.length !== 0){
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    })
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }

    this.obtenerUsuarios();
  }

  buscar( termino: string){
    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    return this.busquedaService.buscar( 'usuarios', termino )
        .subscribe( resp => {

          this.usuarios = resp;

        });
  }

  eliminarUsuario( usuario: Usuario ) {
    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            
            this.obtenerUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

    return;
  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario( usuario )
      .subscribe( resp => {
        console.log(resp); 
      })
  }

  abrirModal(usuario: Usuario){
    this.modalImageService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  displayedColumns1: string[] = ['avatar', 'nombre', 'sesion', 'role', 'correo', 'budget'];
  dataSource1 = PRODUCT_DATA;
  roles: string[] = ['ADMIN_ROLE', 'USER_ROLE'];
}

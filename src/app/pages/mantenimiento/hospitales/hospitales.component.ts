import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { delay, finalize, Subscription } from 'rxjs';
import { Hospital } from '../../../models/Hospital';
import { HospitalService } from '../../../services/hospital.service';
import { ImagenPipe } from '../../../pipes/imagen.pipe';
import { Store } from '@ngrx/store';
import { aparece, apareceBarra, apareceSpinner, desaparece } from '../../../store/loading.reduce';

@Component({
  selector: 'app-hospitales',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ImagenPipe,
    
  ],
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent {

  public hospitales: Hospital[] = [];
  // public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService,
               private store: Store<{ loading: boolean }>,
              ) {
                
              }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    // this.store.dispatch(aparece({loading: {spinner:true, barra: false, cargado: true}}));
    // this.store.dispatch(apareceBarra());
    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarHospitales() );
  }


  buscar( termino: string ) {

    
    if ( termino.length === 0 ) {
      return this.cargarHospitales();
    }
    
    this.busquedasService.buscar( 'hospitales', termino )
    .subscribe( resp => {
          console.log(resp, "habeeer")

          this.hospitales = resp;

        });
  }

  cargarHospitales() {

    // this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => {
          // this.cargando = false;
          this.hospitales = hospitales;
          
        })

  }

  guardarCambios( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', hospital.nombre, 'success' );
        });

  }

  eliminarHospital( hospital: Hospital ) {

    this.hospitalService.borrarHospital( hospital._id)
        .subscribe( resp => {
          this.cargarHospitales();
          Swal.fire( 'Borrado', hospital.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.hospitalService.crearHospital( value )
        .subscribe( (resp: any) => {
          this.cargarHospitales();
          // this.hospitales.push( resp.hospital )
        })
    }
  }

  displayedColumns1: string[] = ['avatar', 'nombre', 'budget'];

  abrirModal(hospital: Hospital) {

    this.modalImagenService.abrirModal( 'hospitales', hospital._id || "", hospital.img );

  }

}

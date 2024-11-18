import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario.service';
import { MedicoService } from '../../../services/medico.service';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/Hospital';
import { Medico } from '../../../models/Medico';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit {

  
  public hospitales: Hospital[] = [];
  
  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado ?: Hospital;


  medicoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarMedico( id ) );


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId  => {
          this.hospitalSeleccionado  = this.hospitales.find( h => h._id === hospitalId );
        })
  }

  
  cargarMedico(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }
    
     this.medicoService.obtenerMedicoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( medico => {

        if ( !medico ) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const { nombre, hospital:{ _id } } = medico; 
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
        return;
      });

  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        console.log(hospitales, "hoswpitallllls")
        this.hospitales = hospitales;
      })

  }



  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      
      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
    }



  }
}

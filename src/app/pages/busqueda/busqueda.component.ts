import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../models/Usuario';
import { Medico } from '../../models/Medico';
import { Hospital } from '../../models/Hospital';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ImagenPipe,
    CommonModule
  ],
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private busquedaService: BusquedasService
  ){

  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({termino}) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string){
    this.busquedaService.busquedaGlobal(termino).subscribe((resp: any) => {
      console.log(resp)
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    })
  }

  displayedColumns1: string[] = ['avatar', 'nombre'];

}

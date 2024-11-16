import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { FileUploadService } from '../../services/file-upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  public actualizarForm: FormGroup = new FormGroup({});
  public usuario !: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {
    this.actualizarForm = this.fb.group({
      nombre: ['EstebanReg', Validators.required],
      email: ['prueba', [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.minLength(6)]],
    })  
  }

  cambiarImagen(event: any){
    const file = event.target.files[0];
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const base64 = reader.readAsDataURL(file);

    return reader.onload = () => this.imgTemp = reader.result;
    
    console.log(event);
  }

  actualizarUsuario(){
    this.usuarioService.actualizarUsuario(this.actualizarForm.value).subscribe(
      (resp: any) => {
        console.log(resp);

        this.usuario.nombre = resp.nombre;
        this.usuario.email = resp.email;

      }, error => {

        //importar modal para el manejo de errores
        console.log(error);
      }
    )
    console.log(this.actualizarForm.value);
  }

  subirImagen(){
    this.fileService.actualizarFot(this.imagenSubir,"usuarios", this.usuario.uid)
    .then(img => this.usuario.img = img);
  }
}

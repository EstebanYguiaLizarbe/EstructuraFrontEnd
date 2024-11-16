import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  public formGroup: FormGroup = new FormGroup({});
  public formSubmmited: boolean = false;

  constructor(private router: Router,private fb: FormBuilder, private usuarioService: UsuarioService){

  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['EstebanReg', [Validators.required, Validators.minLength(3)]],
      email: ['testregister@gmail.com', [Validators.required, Validators.email]],
      password1: ['123', Validators.required],
      password2: ['123', Validators.required],
    }, {
      validators: this.passwordsIguales('password1', 'password2')
    })
  }

  campoValido(campo: string): boolean {
    if(this.formGroup.get(campo)?.invalid && this.formSubmmited){
      return true;
    } else {
      return false;
    }
  }

  //

  crearUsuario(){
    this.formSubmmited = true;
    console.log(this.formGroup.value);

    if(this.formGroup.invalid){
      return;
    }

    this.usuarioService.crearUsuario(this.formGroup.value).subscribe(resp =>{
      console.log('usuaurio creado');
      this.router.navigateByUrl('/login');
      console.log(resp);
    }, (error) => {
      console.warn(error);
    })
    //Se crea el usuario
    // this.usuarioService
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formgroup: FormGroup) => {
      const pass1Control = formgroup.get(pass1Name);
      const pass2Control = formgroup.get(pass2Name);

      console.log(pass1Control, "probar")

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }

  contrasenasValidas(){
    const pass1 = this.formGroup.get('password1');
    const pass2 = this.formGroup.get('password2');

    if((pass1 === pass2) && this.formSubmmited){
      return true;
    } else{
      return false;
    }
  }
}

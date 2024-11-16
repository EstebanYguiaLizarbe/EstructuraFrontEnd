import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef = new ElementRef('');

  public registerForm: FormGroup = new FormGroup({}); 
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {} 

  ngAfterViewInit(): void {
    
  }
  
  googleInit(){
    google.accounts.id.initialize({
      client_id: '1234567894566',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      // document.getElementById("buttonDiv"),
      {theme: "outline", size: "target"}
    )
  }

  handleCredentialResponse(response: any){
    this.usuarioService.loginGoogle(response.credential).subscribe(
      resp => {
        console.log(resp);
        this.router.navigateByUrl("/");
      }
    )
    console.log(response.credential);
  }

  ngOnInit(): void { 
    this.registerForm = this.fb.group({
      email: [localStorage.getItem('email') || '', Validators.required],
      password: ['123456', Validators.required],
      recordar: [false]
    })
  };

  loginUsuario() {

    this.usuarioService.loginUsuario(this.registerForm.value).subscribe(resp => {
      if(this.registerForm.get('recordar')?.value){
        localStorage.setItem('email', this.registerForm.get('email')?.value)
      } else{
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl("/");
      
    }, error => {
      //Mostrar un modal de error
      console.log(error)
    });
    console.log(this.registerForm.value);
  }
  
}

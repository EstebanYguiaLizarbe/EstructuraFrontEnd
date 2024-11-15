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
import { MatButtonModule } from '@angular/material/button';

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
export class LoginComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({}); 
  
  constructor(private fb: FormBuilder) {} 

  ngOnInit(): void { 
    this.registerForm = this.fb.group({
      email: ['test@gmail.com', Validators.required],
      password: ['123456', Validators.required],
      recordar: [false]
    })
  };

  loginUsuario() {
    console.log(this.registerForm.value);
  }
  
}

import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { FormsModule } from '@angular/forms';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  public imgUrl = '';
  public usuario!: Usuario;

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private router: Router
  ) {
    this.usuario = this.usuarioService.usuario;
    //Hasta que conecte con la DB
    this.imgUrl = this.usuarioService.usuario.imagenUrl;

    // this.imgUrl = '/assets/images/profile/user-1.jpg';
  }

  logout(){
    this.usuarioService.logout();
  }

  busquedaGlobal(termino: string){
    console.log(termino.length, "longitud")
    if(termino.length === 0){
      return this.router.navigateByUrl('/');
    }

    this.router.navigateByUrl(`/buscar/${termino}`);
    return;

    //this.globalService.buscar(valor).subscribe(resp => {console.log(resp, "busqueda global")});
  }
}

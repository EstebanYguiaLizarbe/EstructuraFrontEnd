import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const token = inject(UsuarioService);
  const router = inject(Router);

  return token.validarToken().pipe(
    tap( estaAutenticado =>  {
      if ( !estaAutenticado ) {
        router.navigateByUrl('/login');
      }
    })
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, CanLoad, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  
  if (usuarioService.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
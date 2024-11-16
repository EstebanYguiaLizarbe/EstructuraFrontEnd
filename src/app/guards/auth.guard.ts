import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {

  const token = inject(UsuarioService);
  return token.validarToken();
};

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (): Promise<boolean | UrlTree> => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = await firstValueFrom(authState(auth));

  if (!user) {
    // En lugar de router.navigate, retornamos una UrlTree para redirigir correctamente
    return router.parseUrl('/');
    
  }

  return true;
};

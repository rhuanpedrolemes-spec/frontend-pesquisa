import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/admin/login']);
};

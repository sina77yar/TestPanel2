import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loadCurrentUser().pipe(
    map(user => {
      if (user?.IsAdmin) {
        return true;
      } else {
        router.navigate(['/access-denied']); 
        return false;
      }
    })
  );
};

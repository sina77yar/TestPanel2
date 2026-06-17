import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../Services/auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
  
    return authService.loadCurrentUser().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          console.log("NOT ALLOW ROUTE");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
          return false;
        }
      })
    );
  };
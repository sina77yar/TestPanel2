import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../Services/auth.service';

// export const authguardGuard: CanActivateFn = (route, state) => {
//     const authService = inject(AuthService);
  
//     return authService.loadCurrentUser().pipe(
//       map(user => {
//         if (user) {
//           return true;
//         } else {
//           console.log("NOT ALLOW ROUTE");
//           setTimeout(() => {
//             window.location.href = "/login";
//           }, 1000);
//           return false;
//         }
//       })
//     );
//   };
export const authguardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loadCurrentUser().pipe(
    take(1),
    map(user => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};

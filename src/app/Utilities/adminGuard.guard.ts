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
        // اگر ادمین بود اجازه ورود
        return true;
      } else {
        // اگر ادمین نبود → هدایت به صفحه عدم دسترسی
        router.navigate(['/access-denied']); 
        return false;
      }
    })
  );
};

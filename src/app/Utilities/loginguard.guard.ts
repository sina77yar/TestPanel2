import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of, tap } from 'rxjs';
import { AuthService } from '../Services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loadCurrentUser().pipe(
    map(user => {
      if (user) {
        // کاربر لاگین کرده → هدایت به داشبورد
        router.navigate(['/dashboard']);
        return false; // مسیر login را مسدود می‌کنیم
      }
      // کاربر لاگین نکرده → اجازه ورود به صفحه login
      return true;
    }),
    catchError(err => {
      // اگر خطای 401 یا هر خطای دیگر آمد → فقط اجازه ورود به login بده
      return of(true); // مهم: true برمی‌گردد تا مسیر login باز شود
    })
  );
};
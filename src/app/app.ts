import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { CurrentUser } from './DTOs/Account/CurrentUserDTO';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   standalone: false,
//   styleUrl: './app.scss'
// })
// export class App {

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private renderer: Renderer2
//   ) {}

//   ngOnInit() {

//     // از اول UI قفل و sidebar/header مخفی
//     document.body.classList.add('auth-loading');
//     this.hideSidebarAndHeader();
    
//     // **مهم: از همون اول آیتم‌های ادمین رو مخفی کن**
//     this.hideAdminItemsImmediately();

//     // expose logout به window
//     (window as any).angularApp = {
//       logout: () => this.logout()
//     };

//     // مدیریت نمایش sidebar و header
//     this.router.events.subscribe(() => {
//       this.manageSidebarAndHeader();
//     });

//     // گرفتن وضعیت کاربر
//     this.authService.checkUserAdminAuth().subscribe({
//       next: res => {
//         console.log('Response arrived', res); // ببینید کی میاد
//         if (!res || res.status !== 'success') {
//           this.router.navigate(['/login']);
//           return;
//         }
    
//         const isAdmin = res.data.isAdmin === true;
//         console.log('User isAdmin:', isAdmin);
    
//         const user = new CurrentUser(
//           res.data.userId,
//           res.data.fullname,
//           res.data.phone,
//           res.data.email,
//           '',
//           isAdmin
//         );
    
//         this.authService.setCurrentUser(user);
    
//         this.manageAdminOnlyItems(isAdmin);
//         this.setHeaderInfo(user.fullname, isAdmin);
//       },
//       error: err => {
//         console.error('Error:', err);
//         this.router.navigate(['/login']);
//       },
//       complete: () => {
//         console.log('Request complete');
//         this.unlockUI();
//         this.manageSidebarAndHeader();
//       }
//     });
    
//   }

//   private hideSidebarAndHeader() {
//     const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement;
//     const header = document.querySelector('.page-header') as HTMLElement;
//     if (sidebar) sidebar.style.display = 'none';
//     if (header) header.style.display = 'none';
//   }

//   // **متد جدید: مخفی کردن فوری آیتم‌های ادمین**
//   private hideAdminItemsImmediately() {
//     // چندبار اجرا کن تا مطمئن بشی
//     const hideItems = () => {
//       const adminElements = document.querySelectorAll('.admin-only');
//       adminElements.forEach(el => {
//         (el as HTMLElement).style.display = 'none';
//         el.classList.add('d-none');
//       });
//     };
    
//     hideItems(); // بلافاصله
//     setTimeout(hideItems, 10); // بعد از 10ms
//     setTimeout(hideItems, 50); // بعد از 50ms
//   }

//   private manageSidebarAndHeader() {
//     const isLoginPage = this.router.url.startsWith('/login');
//     const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement;
//     const header = document.querySelector('.page-header') as HTMLElement;
    
//     if (sidebar) {
//       sidebar.style.display = isLoginPage ? 'none' : 'block';
//     }
//     if (header) {
//       header.style.display = isLoginPage ? 'none' : 'block';
//     }
//   }

//   private manageAdminOnlyItems(isAdmin: boolean) {
//     setTimeout(() => {
//       const adminElements = document.querySelectorAll('.admin-only');
      
//       if (isAdmin) {
//         // اگر ادمین هست، همه آیتم‌ها رو نمایش بده
//         adminElements.forEach(el => {
//           (el as HTMLElement).style.display = '';
//           el.classList.remove('d-none');
//         });
//       } else {
//         // اگر ادمین نیست، مطمئن شو مخفی هستند
//         adminElements.forEach(el => {
//           (el as HTMLElement).style.display = 'none';
//           el.classList.add('d-none');
//         });
//       }
//     }, 100); // تاخیر کمی بیشتر
//   }

//   private setHeaderInfo(fullname: string, isAdmin: boolean) {
//     setTimeout(() => {
//       const nameSpan = document.querySelector('.profile-media .media-body span');
//       const roleP = document.querySelector('.profile-media .media-body p');

//       if (nameSpan) {
//         nameSpan.textContent = fullname;
//       }

//       if (roleP) {
//         roleP.innerHTML = isAdmin
//           ? `مدیر <i class="middle fa fa-angle-down"></i>`
//           : `بروکر <i class="middle fa fa-angle-down"></i>`;
//       }
//     }, 100);
//   }

//   private unlockUI() {
//     document.body.classList.remove('auth-loading');
//   }

//   logout() {
//     this.deleteCookie('NovinatraBroker-cookie');
//     this.router.navigate(['/login']);
//   }

//   deleteCookie(name: string) {
//     document.cookie = name + '=; Max-Age=0; path=/';
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: false
})
export class App {

  private sidebar!: HTMLElement | null;
  private header!: HTMLElement | null;
  private adminElements!: NodeListOf<HTMLElement>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {

    // قفل UI
    document.body.classList.add('auth-loading');

    // cache DOM (خیلی مهم)
    this.sidebar = document.querySelector('.sidebar-wrapper');
    this.header = document.querySelector('.page-header');
    this.adminElements = document.querySelectorAll('.admin-only');

    this.hideLayout();

    (window as any).angularApp = {
      logout: () => this.logout()
    };

    // فقط وقتی URL عوض شد
    this.router.events.subscribe(() => this.toggleLayout());

    this.authService.checkUserAdminAuth().subscribe({
      next: res => {
        if (res?.status !== 'success') {
          this.router.navigate(['/login']);
          return;
        }

        const isAdmin = res.data.isAdmin === true;

        this.authService.setCurrentUser(
          new CurrentUser(
            res.data.userId,
            res.data.fullname,
            res.data.phone,
            res.data.email,
            '',
            isAdmin
          )
        );

        this.setAdminVisibility(isAdmin);
        this.setHeaderInfo(res.data.fullname, isAdmin);
      },
      error: () => this.router.navigate(['/login']),
      complete: () => {
        document.body.classList.remove('auth-loading');
        this.toggleLayout();
      }
    });
  }

  private hideLayout() {
    if (this.sidebar) this.sidebar.style.display = 'none';
    if (this.header) this.header.style.display = 'none';
    this.adminElements.forEach(el => el.style.display = 'none');
  }

  private toggleLayout() {
    const isLogin = this.router.url.startsWith('/login');
    if (this.sidebar) this.sidebar.style.display = isLogin ? 'none' : 'block';
    if (this.header) this.header.style.display = isLogin ? 'none' : 'block';
  }

  private setAdminVisibility(isAdmin: boolean) {
    this.adminElements.forEach(el => {
      el.style.display = isAdmin ? '' : 'none';
    });
  }

  private setHeaderInfo(fullname: string, isAdmin: boolean) {
    const name = document.querySelector('.profile-media span');
    const role = document.querySelector('.profile-media p');

    if (name) name.textContent = fullname;
    if (role) {
      role.innerHTML = isAdmin
        ? `مدیر <i class="fa fa-angle-down"></i>`
        : `بروکر <i class="fa fa-angle-down"></i>`;
    }
  }

  logout() {
    document.cookie = 'NovinatraBroker-cookie=; Max-Age=0; path=/';
    this.router.navigate(['/login']);
  }
}

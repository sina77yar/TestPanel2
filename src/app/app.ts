import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { CurrentUser } from './DTOs/Account/CurrentUserDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App  implements OnInit {
  constructor(private router: Router,private Authservice : AuthService) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement;
      const header  = document.querySelector('.page-header') as HTMLElement;

      if (sidebar) sidebar.style.display = this.router.url.startsWith('/login') ? 'none' : 'block';
      if (header)  header.style.display  = this.router.url.startsWith('/login') ? 'none' : 'block';
    });
    this.Authservice.updateSidebar();
    this.Authservice.checkUserAdminAuth().subscribe({
      next: res => {
        if (res?.status === "success") {
          const user = new CurrentUser(
            res.data.userId,
            res.data.fullname,
            res.data.phone,
            res.data.email,
            "",
            res.data.IsAdmin
          );
          this.Authservice.setCurrentUser(user);
        } else {
          // اگر API بدون خطا جواب داد ولی status != success بود
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
    
  }
  title = 'AdminPanel';
}

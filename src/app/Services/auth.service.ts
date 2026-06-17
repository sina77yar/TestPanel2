import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { RegisterUserDTO } from '../DTOs/Account/RegisterUserDTO';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUserDTO } from '../DTOs/Account/LoginUserDTO';
import { CurrentUser } from '../DTOs/Account/CurrentUserDTO';
import { ICheckUserAuthResult } from '../DTOs/Account/ICheckUserAuthResult';
import { EditUserDTO } from '../DTOs/Account/EditUserDTO';
import { changePassDTO } from '../DTOs/Account/changePassDTO';
import { IResponseResult } from '../Common/IResponseResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUser:CurrentUser;
  private currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);
  currentaccount$ = this.currentUser.asObservable();
  private renderer: Renderer2;

  constructor(
    private http: HttpClient,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

  }



  updateSidebar() {
    this.loadCurrentUser().subscribe(user => {

      const adminItems = document.querySelectorAll('.admin-only');
      adminItems.forEach(el => {
        if (user?.IsAdmin) {
          this.renderer.setStyle(el, 'display', ''); // نمایش
        } else {
          this.renderer.setStyle(el, 'display', 'none'); // مخفی
        }
      });
    });
  }
  loadCurrentUser(): Observable<CurrentUser> {
    return this.http.post<any>('api/AdminAccount/check-auth', {}, { withCredentials: true })
      .pipe(
        map(res => {
          if (res.status === 'success') {
            const user = new CurrentUser(res.data.userId, res.data.fullname, res.data.phone, res.data.email, "", res.data.isAdmin);
            this.setCurrentUser(user);
            return user;
          }
          return null;
        })
      );
  }
  setCurrentUser(user: CurrentUser): void {
    this.currentUser.next(user);
  }
  getCurrentUser(): Observable<CurrentUser> {
    console.log(this.currentUser);
    return this.currentUser;

  }
  registerUser(registerData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>('api/Account/register', registerData)
  }
  loginUser(registerData: LoginUserDTO): Observable<any> {
    return this.http.post<any>('api/AdminAccount/loginadmin', registerData)
  }
  checkUserAdminAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>("api/AdminAccount/check-auth",  {});
  }
  checkUserAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>("api/account/check-auth", null);
  }
  logOutUser(): Observable<any> {
    return this.http.get('api/account/sign-out')
  }
  editUser(EditData: EditUserDTO): Observable<any> {
    return this.http.post<any>('api/Account/EditUser', EditData)
  }
  changePass(EditData: changePassDTO): Observable<any> {
    return this.http.post<any>('api/Account/ChangeUserPassword', EditData)
  }


  changeUserActive(id: number): Observable<any> {
    return this.http.get<any>('api/AdminAccount/changeUserActive/' + id)
  }
}

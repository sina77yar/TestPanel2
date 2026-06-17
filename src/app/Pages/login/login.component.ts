import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUser } from '../../DTOs/Account/CurrentUserDTO';
import { LoginUserDTO } from '../../DTOs/Account/LoginUserDTO';
import { AuthService } from '../../Services/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private _router: Router,
    private cookieService: CookieService
  ) {

  }
  public loginForm: FormGroup;
  user: CurrentUser = null;
  @ViewChild('usernotfoundSwal')
  public readonly usernotfoundSwal: SwalComponent;
  @ViewChild('userfoundSwal')
  public readonly userfoundSwal: SwalComponent;

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe(res => {
      this.user = res;
    })
    this.loginForm = new FormGroup({
      Password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      Email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
    })
  }
  SubmitLoginForm() {

    var loginData = new LoginUserDTO(
      this.loginForm.controls['Password'].value,
      this.loginForm.controls['Email'].value,)

    this.authservice.loginUser(loginData).subscribe(res => {

      if (res.status == "NotFound") {
        Swal.fire({
          title: 'خطا' ,
          text: 'اطلاعت کاربری وارد  شده صحیح نیست',
          icon: 'error',
          showConfirmButton:false,
          timer:2000
        });
      }
      const currentUser = new CurrentUser(
        res.data.userid,
        res.data.fullname,
      );

      this.authservice.setCurrentUser(currentUser);
      this.authservice.getCurrentUser().subscribe(res => {
        console.log(res);

      })
      this.cookieService.set("NovinatraBroker-cookie", res.data.token, res.data.expireTime)
      this._router.navigate(['/dashboard'])
    })

  }
}
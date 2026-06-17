import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { changePassDTO } from '../../DTOs/Account/changePassDTO';
import Swal from 'sweetalert2';
import { ApiServicesService } from '../../Services/api-services.service';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: any[] = []
  newPass: string = "";

  constructor(private authService: AuthService, private apiService: ApiServicesService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this.apiService.GetAllCustomers().subscribe({
      next: (res) => {
        console.log(res.data);

        this.users = res.data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
  ChangeUserActive(id: number) {
    this.authService.changeUserActive(id).subscribe(res => {
      this.GetAll();
    })
  }
  SelectedUserId: number = 0;
  FillChangePassForm(id) {
    this.SelectedUserId = id;
  }
  changeUserPass(newPass: string) {
    if (this.SelectedUserId != 0) {
      var dto = new changePassDTO(this.SelectedUserId, newPass);
      if (newPass != "") {

        this.authService.changePass(dto).subscribe(res => {
          this.newPass = "";
        })
      }
      else {
        Swal.fire("رمزعبور جدید وارد نشده است", "", "error")
      }
    }
  }

}

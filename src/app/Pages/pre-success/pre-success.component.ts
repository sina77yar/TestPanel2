import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TaskDTO } from '../../DTOs/Tasks/TaskDTO';
import { TaskStatusEnum } from '../../DTOs/Tasks/TaskStatusEnum';
import { ApiServicesService } from '../../Services/api-services.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-pre-success',
  standalone: false,
  
  templateUrl: './pre-success.component.html',
  styleUrl: './pre-success.component.scss'
})
export class PreSuccessComponent implements OnInit {

  AllPreSuccess: any[] = [];
  currentUserId: number = 0
  public editStatus: FormGroup<any> = new FormGroup({});
  taskStatusOptions = [
    // { id: TaskStatusEnum.InProgress, name: 'در حال انجام' },
    { id: TaskStatusEnum.Success, name: 'موفق' },
    { id: TaskStatusEnum.Reject, name: 'رد شده' },
    // { id: TaskStatusEnum.Indeterminate, name: 'فعال' }
  ];
  constructor(private apiServicesService: ApiServicesService, private authService: AuthService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.editStatus = new FormGroup({
      Id: new FormControl(null),
      Status: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
    })
    this.GetCurrentUser();
    this.GetAllPreSuccess();
  }
  GetAllPreSuccess() {
    this.apiServicesService.GetAllPreSuccess().subscribe({
      next: (res) => {
        this.AllPreSuccess = res.data;
        console.log(this.AllPreSuccess);

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });

  }

  GetCurrentUser() {
    this.authService.getCurrentUser().subscribe(res => {
      console.log(res);

      this.currentUserId = res.userId
    })
  }
  FillEditForm(form: any) {

    this.editStatus.patchValue({
      Status: form.brokerDetailStatusTypes,
      Id: form.id
    });
  }
  getStatusInfo(status: number) {
    switch (status) {
      case 1:
        return { text: 'در جریان', class: 'badge bg-warning' };

      case 2:
        return { text: 'موفق', class: 'badge bg-success' };

      case 3:
        return { text: 'رد شده', class: 'badge bg-danger' };

      case 4:
        return { text: 'نامشخص', class: 'badge bg-secondary' };

      default:
        return { text: 'نامشخص', class: 'badge bg-dark' };
    }
  }
  SubmitEditStatus() {
    var task = new TaskDTO(
      this.editStatus.controls['Id'].value,
      0,
      0,
      this.editStatus.controls['Status'].value,
      ""
    );
    this.apiServicesService.SubmitPreSuccessStatus(task).subscribe(res => {
      if (res.status == "Error") {

        return Swal.fire(res.data, "", "warning")
      } else {

        this.GetAllPreSuccess();
        this.cdr.detectChanges();
        return Swal.fire("ثبت با موفقیت انجام شد", "", "success")
      }
    });
  }
}

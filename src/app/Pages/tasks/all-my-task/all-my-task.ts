import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../../Services/api-services.service';
import { NewTaskDTO, TaskDTO } from '../../../DTOs/Tasks/TaskDTO';
import { AuthService } from '../../../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskStatusEnum } from '../../../DTOs/Tasks/TaskStatusEnum';
import Swal from 'sweetalert2';
import { interval, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-all-my-task',
  standalone: false,
  templateUrl: './all-my-task.html',
  styleUrl: './all-my-task.scss',
})
export class AllMyTask implements OnInit {

  selectedTask: any;
  AllmyTasks: any[] = [];
  currentUserId: number = 0
  isThisUserAdmin: boolean = false;
  public editStatus: FormGroup<any> = new FormGroup({});
  taskStatusOptions = [
    { id: TaskStatusEnum.InProgress, name: 'در حال انجام' },
    { id: TaskStatusEnum.Success, name: 'موفق' },
    { id: TaskStatusEnum.Reject, name: 'رد شده' },
    { id: TaskStatusEnum.Indeterminate, name: 'فعال' }
  ];
  isEditStatus: boolean = false;
  
  private taskSub!: Subscription;
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
    this.GetAllMyTask();
    this.taskSub = interval(5000).subscribe(() => {
      this.GetAllMyTask();
    });
  }
  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }

  GetAllMyTask() {

    // this.apiServicesService.GetAllBrokerDataByUserId(this.currentUserId).subscribe({

    //   next: (res) => {
    //     debugger

    //     this.AllmyTasks = [];
    //     this.AllmyTasks = [...res.data];
    //     this.cdr.detectChanges();
    //   },
    //   error: (err) => console.error(err)
    // });
    this.apiServicesService.GetAllBrokerDataByUserId(this.currentUserId).subscribe(res => {
      debugger
      this.AllmyTasks = res.data;
      this.cdr.detectChanges();
    })
  }

  GetCurrentUser() {
    this.authService.getCurrentUser()
      .pipe(
        tap(res => {
          this.isThisUserAdmin = res.IsAdmin === true;
          this.currentUserId = res.userId;
        })
      )
      .subscribe(() => {
        // 👈 هر چیزی که به currentUserId وابسته‌ست اینجاست
        console.log('current:', this.currentUserId);
      });
  }
  FillEditForm(form: any) {
    this.editStatus.patchValue({
      Status: form.brokerDetailStatusTypes,
      Id: form.id
    });
  }
  FillDetailForm(form: any) {

    this.selectedTask = form;
    console.log(this.selectedTask);

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
        return { text: 'فعال', class: 'badge bg-secondary' };
      case 5:
        return { text: 'در انتظار تائید مدیر', class: 'badge bg-primary' };
      default:
        return { text: 'نامشخص', class: 'badge bg-dark' };
    }
  }
  SubmitEditStatus() {
    debugger

    var task = new TaskDTO(
      this.editStatus.controls['Id'].value,
      0,
      0,
      this.editStatus.controls['Status'].value,
      "",
    );
    this.apiServicesService.SubmitEditBrokerDetailStatus(task).subscribe(res => {
      if (res.status == "Error") {

        return Swal.fire(res.data, "", "warning")
      } else {
        this.isEditStatus = false;
        return Swal.fire("ثبت با موفقیت انجام شد، تغییرات تا لحظاتی دیگر اعمال خواهد شد", "", "success")

      }
    });
    this.GetAllMyTask();
  }
  selectedIdForDelete: number = 0;

  DeleteBrokerDetailRecord() {
    if (this.selectedIdForDelete != 0) {

      this.apiServicesService.DeleteBrokerDetailRecord(this.selectedIdForDelete).subscribe(res => {
        this.selectedIdForDelete = 0;
        this.GetAllMyTask();
      });
    }
  }
  sendId(id: number) {
    this.selectedIdForDelete = id;
  }
}

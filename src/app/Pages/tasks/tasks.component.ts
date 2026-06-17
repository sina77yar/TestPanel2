import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../Services/api-services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTaskDTO } from '../../DTOs/Tasks/TaskDTO';
import { TaskStatusEnum } from '../../DTOs/Tasks/TaskStatusEnum';
import { CompanyDTO } from '../../DTOs/Company/CompanyDTO';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';
import { ProductDTO } from '../../DTOs/Product/ProductDTO';

@Component({
  selector: 'app-tasks',
  standalone: false,

  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  constructor(private apiServicesService: ApiServicesService, private authService: AuthService, private cdr: ChangeDetectorRef) { }
  AllTodayTasks: any[] = [];
  ActiveCompanies: CompanyDTO[] = [];
  ActiveProducts: ProductDTO[] = [];
  public TaskForm: FormGroup<any> = new FormGroup({});
  TaskStatus = TaskStatusEnum;
  currentUserId: number = 0;
  isNewCompany: boolean = false;
  taskStatusOptions = [
    { id: TaskStatusEnum.InProgress, name: 'در حال پیگیری' },
    { id: TaskStatusEnum.Success, name: 'موفق' },
    { id: TaskStatusEnum.Reject, name: 'رد شده' },
    { id: TaskStatusEnum.Indeterminate, name: 'فعال' }
  ];
  selectedStatus?: TaskStatusEnum;
  SelectedCompanyId: number | null = null;
  ngOnInit(): void {
    this.GetCurrentUser();

    this.TaskForm = new FormGroup({

      IsNewCompany: new FormControl(false),

      CompanyId: new FormControl(null),

      CompanyPhone: new FormControl(null),
      ContactPerson: new FormControl(null),
      CompanyName: new FormControl(null),

      ProductId: new FormControl(null, Validators.required),
      UserId: new FormControl(this.currentUserId, Validators.required),
      Status: new FormControl(null, Validators.required),
      Description: new FormControl(null),
    });
    this.TaskForm.get('IsNewCompany')?.valueChanges.subscribe(isNew => {

      const companyId = this.TaskForm.get('CompanyId');
      const phone = this.TaskForm.get('CompanyPhone');
      const contact = this.TaskForm.get('ContactPerson');
      const companyName = this.TaskForm.get('CompanyName');

      if (isNew) {
        companyId?.clearValidators();
        companyId?.setValue(null);

        phone?.setValidators([Validators.required]);
        contact?.setValidators([Validators.required]);
        companyName?.setValidators([Validators.required]);
      } else {
        companyId?.setValidators([Validators.required]);

        phone?.clearValidators();
        contact?.clearValidators();
        companyName?.clearValidators();
        phone?.setValue(null);
        contact?.setValue(null);
        companyName?.setValue(null);
      }

      companyId?.updateValueAndValidity();
      phone?.updateValueAndValidity();
      contact?.updateValueAndValidity();
      companyName?.updateValueAndValidity();

    });

    this.GetAllTodayTask();
    this.GetAllActiveComapanies();
    this.GetAllActiveProducts();
  }
  GetCurrentUser() {
    this.authService.getCurrentUser().subscribe(res => {
      console.log(res);
      this.currentUserId = res.userId
    })
  }
  SubmitNewTask() {
    if (this.TaskForm.valid == false) {
      console.log(this.TaskForm);

      Swal.fire("تمامی موارد باید پر شود", "", "error")
    }
    const dto = new NewTaskDTO(
      this.TaskForm.value.CompanyId,
      this.TaskForm.value.ProductId,
      this.TaskForm.value.UserId,
      this.TaskForm.value.Status,
      this.TaskForm.value.Description,
      this.TaskForm.value.IsNewCompany,
      this.TaskForm.value.CompanyPhone,
      this.TaskForm.value.ContactPerson,
      this.TaskForm.value.CompanyName
    );

    this.apiServicesService.SubmitNewTask(dto).subscribe(res => {
      if (res.status == "Error") {

        return Swal.fire(res.data, "", "warning")
      } else {

        this.GetAllTodayTask();
        this.cdr.detectChanges();
        this.TaskForm.reset();
        return Swal.fire("ثبت با موفقیت انجام شد", "", "success")
      }
    });
  }
  GetAllTodayTask() {
    this.apiServicesService.GetAllTodayTasksByUserId(this.currentUserId).subscribe({
      next: (res) => {
        this.AllTodayTasks = res.data;

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });

  }
  GetAllActiveComapanies() {
    this.apiServicesService.GetAllActiveComapanies().subscribe(res => {
      this.ActiveCompanies = res.data ?? [];
    });
  }
  GetAllActiveProducts() {
    this.apiServicesService.GetAllActiveProducts(this.currentUserId).subscribe(res => {

      this.ActiveProducts = res.data ?? [];
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
        return { text: 'فعال', class: 'badge bg-secondary' };
      case 5:
        return { text: 'درانتظار تائید', class: 'badge bg-primary' };
      default:
        return { text: 'نامشخص', class: 'badge bg-dark' };
    }
  }

}

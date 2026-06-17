import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../Services/api-services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTaskDTO } from '../../DTOs/Tasks/TaskDTO';
import { TaskStatusEnum } from '../../DTOs/Tasks/TaskStatusEnum';
import { CompanyDTO } from '../../DTOs/Company/CompanyDTO';

@Component({
  selector: 'app-tasks',
  standalone: false,

  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  constructor(private apiServicesService: ApiServicesService) { }
  AllTodayTasks: any[] = [];
  ActiveCompanies: CompanyDTO[]=[];
  public TaskForm: FormGroup<any> = new FormGroup({});
  TaskStatus = TaskStatusEnum;

  taskStatusOptions = [
    { id: TaskStatusEnum.InProgress, name: 'در حال انجام' },
    { id: TaskStatusEnum.Success, name: 'موفق' },
    { id: TaskStatusEnum.Reject, name: 'رد شده' },
    { id: TaskStatusEnum.Indeterminate, name: 'فعال' }
  ];
  selectedStatus?: TaskStatusEnum;
  SelectedCompanyId: number | null = null;
  ngOnInit(): void {

    this.TaskForm = new FormGroup({
      CompanyId: new FormControl(null, Validators.required),
      UserId: new FormControl(null, Validators.required),
      Status: new FormControl(null, Validators.required),
      Description: new FormControl(null),
    });
  
    this.GetAllTodayTask();
    this.GetAllActiveComapanies();
    console.log(this.taskStatusOptions);
    
  }
  
  SubmitNewTask() {
    var task = new NewTaskDTO(
      this.TaskForm.controls['CompanyId'].value,
      this.TaskForm.controls['UserId'].value,
      this.TaskForm.controls['Status'].value,
      this.TaskForm.controls['Description'].value
    );
    this.apiServicesService.SubmitNewTask(task).subscribe(res => {
      this.GetAllTodayTask();
      this.TaskForm.reset();
    });
  }
  GetAllTodayTask() {
    this.apiServicesService.GetAllTodayTasksByUserId(1).subscribe(res => {
      this.AllTodayTasks = res.data;
    });
  }
  GetAllActiveComapanies() {
    this.apiServicesService.GetAllActiveComapanies().subscribe(res => {
      this.ActiveCompanies = res.data ?? [];
    });
  }
}

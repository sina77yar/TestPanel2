import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../../Services/api-services.service';
import { TaskDTO } from '../../../DTOs/Tasks/TaskDTO';

@Component({
  selector: 'app-all-my-task',
  standalone: false,
  templateUrl: './all-my-task.html',
  styleUrl: './all-my-task.scss',
})
export class AllMyTask implements OnInit {
  AllmyTasks: TaskDTO[] = [];
  constructor(private apiServicesService: ApiServicesService) {}
  ngOnInit(): void {
    this.GetAllMyTask();
  }
  GetAllMyTask() {
    this.apiServicesService.GetAllTodayTasksByUserId(1).subscribe(res=> {
      this.AllmyTasks = res.data;
    });
  }
}

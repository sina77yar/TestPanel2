import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../Services/api-services.service';
import { DsahboardDTO } from '../../DTOs/Dashboard/DashboardDTO';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(private apiService: ApiServicesService, private cdr: ChangeDetectorRef) { }
  data: DsahboardDTO;
  ngOnInit(): void {
    this.apiService.GetDashboardData().subscribe({

      next: (res) => {
        this.data = res.data;
        console.log(this.data);

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)

    });


  }
  sideOfCountryMap: any = {
    1: 'شمال',
    2: 'جنوب',
    3: 'شرق',
    4: 'غرب',
    5: 'مرکز',
  };
  
}

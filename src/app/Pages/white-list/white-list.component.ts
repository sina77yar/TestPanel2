import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../Services/api-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-white-list',
  standalone: false,

  templateUrl: './white-list.component.html',
  styleUrl: './white-list.component.scss'
})
export class WhiteListComponent implements OnInit {
  constructor(private apiServicesService: ApiServicesService, private authService: AuthService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.GetAllRejected();
  }
  AllRejected: any[] = [];
  GetAllRejected() {
    this.apiServicesService.GetAllRejected().subscribe({
      next: (res) => {
        this.AllRejected = res.data;
        console.log(this.AllRejected);

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });

  }
}

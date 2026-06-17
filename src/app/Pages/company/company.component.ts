import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { CompanyDTO, NewCompanyDTO } from '../../DTOs/Company/CompanyDTO';
import { ApiServicesService } from '../../Services/api-services.service';

@Component({
  selector: 'app-company',
  standalone: false,
  
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {

  public editCompany: FormGroup<any> = new FormGroup({});
  selectedDeleteId: number = 0;

  public SubmitCompany: FormGroup<any> = new FormGroup({});;

  constructor(private apiService: ApiServicesService, private cdr: ChangeDetectorRef) { }
  Companies: CompanyDTO[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;
  ngOnInit(): void {

    this.GetAllCompanies();

    this.SubmitCompany = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
      ]),
    })
    this.editCompany = new FormGroup({
      Id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
        Validators.required,
      ]),
    })
  }


  GetAllCompanies() {
    this.apiService.GetAllCompanies().subscribe({
      next: (res) => {
        this.Companies = res.data;
        console.log('Companies:', this.Companies);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  SubmitNewCompany() {
    var Company = new NewCompanyDTO(
      this.SubmitCompany.controls["name"].value,
      true
    );
    this.apiService.SubmitNewCompany(Company).subscribe(res => {
      this.GetAllCompanies();
      this.SubmitCompany.reset();
    });
  }
  SubmitEditCompany() {
    var Company = new CompanyDTO(
      this.editCompany.controls["Id"].value,
      this.editCompany.controls["name"].value,
      this.editCompany.controls["isActive"].value,
    );
    this.apiService.SubmitEditCompany(Company).subscribe(res => {
      this.GetAllCompanies();
      this.SubmitCompany.reset();
    });
  }
  DeleteCompany() {
    if (this.selectedDeleteId != 0) {

      this.apiService.DeleteCompany(this.selectedDeleteId).subscribe(res => {
        this.selectedDeleteId = 0;
        this.GetAllCompanies();
      });
    }

  }

  FillEditForm(form: CompanyDTO) {
    this.editCompany.patchValue({
      name: form.name,
      isActive: form.isActive,
      Id: form.id
    });
  }
  sendId(id: number) {

    this.selectedDeleteId = id;
  }
  ToggleIsActive() {
    const currentValue = this.editCompany.get('isActive')?.value;
    this.editCompany.get('isActive')?.setValue(!currentValue);
  }
}

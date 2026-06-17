import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { CompanyDTO, NewCompanyDTO } from '../../DTOs/Company/CompanyDTO';
import { ApiServicesService } from '../../Services/api-services.service';
import Swal from 'sweetalert2';

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
  Companies: any[] = [];

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
      true,
      false,
      null
    );
    this.apiService.SubmitNewCompany(Company).subscribe(res => {
      if (res.status == "Error") {

        return Swal.fire(res.data, "", "warning")
      }
      else {
        this.GetAllCompanies();
        this.SubmitCompany.reset();
        return Swal.fire("ثبت با موفقیت انجام شد", "", "success")
      }
    });
  }
  SubmitEditCompany() {
    var Company = new CompanyDTO(
      this.editCompany.controls["Id"].value,
      this.editCompany.controls["name"].value,
      this.editCompany.controls["isActive"].value,
      false
      , null
    );
    this.apiService.SubmitEditCompany(Company).subscribe(res => {
      this.GetAllCompanies();
      this.SubmitCompany.reset();
    });
  }
  DeleteCompany() {
    if (this.selectedDeleteId != 0) {

      this.apiService.DeleteCompany(this.selectedDeleteId).subscribe(res => {
        if (res.status == "Error") {
          Swal.fire(res.data, "", "error");
        }
        else {
          this.selectedDeleteId = 0;
          Swal.fire("با موفقیت انجام شد", "", "success");
        }
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

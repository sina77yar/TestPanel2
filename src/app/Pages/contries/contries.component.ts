import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ApiServicesService } from '../../Services/api-services.service';
import { ContryDTO, NewContryDTO } from '../../DTOs/ContryProvince/ContryDTO';
import { SideOfContryTypes } from '../../DTOs/ContryProvince/SideOfContryTypes';
import { NewProvinceDTO, ProvinceDTO } from '../../DTOs/ContryProvince/ProvinceDTO';

@Component({
  selector: 'app-contries',
  standalone: false,

  templateUrl: './contries.component.html',
  styleUrl: './contries.component.scss'
})
export class ContriesComponent implements OnInit {

  public editContry: FormGroup<any> = new FormGroup({});
  public editProvinceForm: FormGroup<any> = new FormGroup({});
  selectedDeleteId: number = 0;

  public SubmitContry: FormGroup<any> = new FormGroup({});;
  public ProvinceForm: FormGroup<any> = new FormGroup({});;

  constructor(private apiService: ApiServicesService, private cdr: ChangeDetectorRef) { }
  Contries: ContryDTO[] = [];
  Provinces: ProvinceDTO[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;
  ngOnInit(): void {

    this.GetAllContries();

    this.SubmitContry = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
      ]),
    })
    this.editContry = new FormGroup({
      Id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
        Validators.required,
      ]),
    })

    this.ProvinceForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      ContryId: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      SideOfContryTypes: new FormControl(null, [
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
      ]),


    })
    this.editProvinceForm = new FormGroup({
      Id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      ContryId: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      SideOfContryTypes: new FormControl(null, [
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
      ]),
    })
  }
  SideOfContryTypes = SideOfContryTypes;

  SideOfContryTypesOptions = [
    { id: SideOfContryTypes.North, name: 'شمال' },
    { id: SideOfContryTypes.South, name: 'جنوب' },
    { id: SideOfContryTypes.East, name: 'شرق' },
    { id: SideOfContryTypes.West, name: 'غرب' },
    { id: SideOfContryTypes.Center, name: 'مرکز' }
  ];
  selectedStatus?: SideOfContryTypes;

  GetAllContries() {
    this.apiService.GetAllContries().subscribe({
      next: (res) => {
        this.Contries = res.data;
        console.log('Contries:', this.Contries);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
  GetAllProvinces() {
    if (this.SelectedContryId != 0) {
      this.apiService.GetAllProvince(this.SelectedContryId).subscribe({
        next: (res) => {
          this.Provinces = res.data;
          console.log('Provinces:', this.Provinces);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }
  SubmitNewContry() {
    var Contry = new NewContryDTO(
      this.SubmitContry.controls["name"].value,
      true
    );
    this.apiService.SubmitNewContry(Contry).subscribe(res => {
      this.GetAllContries();
      this.SubmitContry.reset();
    });
  }

  SubmitEditContry() {
    var Contry = new ContryDTO(
      this.editContry.controls["Id"].value,
      this.editContry.controls["name"].value,
      this.editContry.controls["isActive"].value,
    );
    this.apiService.SubmitEditContry(Contry).subscribe(res => {
      this.GetAllContries();
      this.SubmitContry.reset();
    });
  }
  DeleteContry() {
    if (this.selectedDeleteId != 0) {

      this.apiService.DeleteContry(this.selectedDeleteId).subscribe(res => {
        this.selectedDeleteId = 0;
        this.GetAllContries();
      });
    }

  }
  FillEditForm(form: ContryDTO) {
    this.editContry.patchValue({
      name: form.name,
      isActive: form.isActive,
      Id: form.id
    });
  }

  FillEditProvinceForm(form: ProvinceDTO) {
    this.editContry.patchValue({
      ProvinceName: form.provinceName,
      isActive: form.isActive,
      Id: form.id
    });
  }
  sendId(id: number) {

    this.selectedDeleteId = id;
  }
  SelectedContryId = 0;
  SelectedContry(id: number) {

    this.SelectedContryId = id;
    this.GetAllProvinces();
  }
  ToggleIsActive() {
    const currentValue = this.editContry.get('isActive')?.value;
    this.editContry.get('isActive')?.setValue(!currentValue);
  }


  SubmitNewProvince() {
    var Province = new NewProvinceDTO(
      this.ProvinceForm.controls["name"].value,
      this.SelectedContryId, true,
      this.ProvinceForm.controls["SideOfContryTypes"].value,

    );
    this.apiService.SubmitNewProvince(Province).subscribe(res => {
      this.GetAllContries();
      this.GetAllProvinces();
      this.ProvinceForm.reset();
    });
  }
  DeleteProvince(id: number) {

    this.apiService.DeleteProvince(id).subscribe(res => {
      this.GetAllProvinces();
    });


  }
}

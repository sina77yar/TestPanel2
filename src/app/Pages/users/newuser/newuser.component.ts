import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../../DTOs/Product/ProductDTO';
import { ContryDTO } from '../../../DTOs/ContryProvince/ContryDTO';
import { ProvinceDTO } from '../../../DTOs/ContryProvince/ProvinceDTO';
import { ApiServicesService } from '../../../Services/api-services.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserDTO } from '../../../DTOs/Account/RegisterUserDTO';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-newuser',
  standalone: false,

  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.scss'
})
export class NewuserComponent implements OnInit {
  constructor(private apiService: ApiServicesService, private authService: AuthService) { }
  public AddUserForm: FormGroup<any> = new FormGroup({});
  products: ProductDTO[] = [];
  contries: ContryDTO[] = [];
  provinces: ProvinceDTO[] = [];
  selectedContryId: number = 0;
  ngOnInit(): void {
    this.AddUserForm = new FormGroup({
      Fullname: new FormControl(null, Validators.required),
      Email: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
      Contry: new FormControl(null, Validators.required),
      Province: new FormControl(null, Validators.required),
      Product: new FormControl(null, Validators.required),
      Description: new FormControl(null),
    });
    this.GetAllActiveProducts();
    this.GetAllActiveContries();
  }
  GetAllActiveContries() {
    this.apiService.GetAllActiveContries().subscribe(res => {
      setTimeout(() => {

        this.contries = res.data;
        console.log("contries:");
        console.log(this.contries);
      }, 1000);
    })
  }
  GetAllActiveProvinces(id: number) {
    this.provinces = []
    setTimeout(() => {
      this.apiService.GetAllActiveProvince(id).subscribe(res => {
        this.provinces = res.data;
        console.log("provinces:");
        console.log(this.provinces);
      })
    }, 100);

  }
  GetAllActiveProducts() {
    this.apiService.GetAllActiveProducts(0).subscribe(res => {
      setTimeout(() => {
        this.products = res.data;
        console.log("product:");
        console.log(this.products);
      }, 1000);
    })
  }
  SubmitNewUser() {

    var user = new RegisterUserDTO(
      this.AddUserForm.controls['Email'].value,
      this.AddUserForm.controls['Fullname'].value,
      this.AddUserForm.controls['Password'].value,
      this.AddUserForm.controls['Contry'].value,
      this.AddUserForm.controls['Province'].value,
      this.AddUserForm.controls['Product'].value,
    );
    this.authService.registerUser(user).subscribe(res => {
      Swal.fire("با موفقیت انجام شد","","success");
      this.AddUserForm.reset();
    });
  }

}

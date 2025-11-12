import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ApiServicesService } from '../../Services/api-services.service';
import { NewProductDTO, ProductDTO } from '../../DTOs/Product/ProductDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: false,

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public editProduct: FormGroup<any> = new FormGroup({});
  selectedDeleteId: number = 0;

  public SubmitProduct: FormGroup<any> = new FormGroup({});;

  constructor(private apiService: ApiServicesService, private cdr: ChangeDetectorRef) { }
  Products: ProductDTO[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;
  ngOnInit(): void {

    this.GetAllProducts();

    this.SubmitProduct = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      isActive: new FormControl(null, [
      ]),
    })
    this.editProduct = new FormGroup({
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


  GetAllProducts() {
    this.apiService.GetAllProducts().subscribe({
      next: (res) => {
        this.Products = res.data;
        console.log('Products:', this.Products);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  SubmitNewProduct() {
    var product = new NewProductDTO(
      this.SubmitProduct.controls["name"].value,
      true
    );
    this.apiService.SubmitEditProduct(product).subscribe(res => {
      this.GetAllProducts();
      this.editProduct.reset();
    });
  }
  SubmitEditProduct() {
    var product = new ProductDTO(
      this.editProduct.controls["Id"].value,
      this.editProduct.controls["name"].value,
      this.editProduct.controls["isActive"].value,
    );
    this.apiService.SubmitEditProduct(product).subscribe(res => {
      this.GetAllProducts();
      this.SubmitProduct.reset();
    });
  }
  DeleteProduct() {
    if (this.selectedDeleteId != 0) {

      this.apiService.DeleteProduct(this.selectedDeleteId).subscribe(res => {
        this.selectedDeleteId = 0;
        this.GetAllProducts();
      });
    }

  }

  FillEditForm(form: ProductDTO) {
    this.editProduct.patchValue({
      name: form.name,
      isActive: form.isActive,
      Id: form.id
    });
  }
  sendId(id: number) {

    this.selectedDeleteId = id;
  }
  ToggleIsActive() {
    const currentValue = this.editProduct.get('isActive')?.value;
    this.editProduct.get('isActive')?.setValue(!currentValue);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../Common/IResponseResult';
import { NewProductDTO, ProductDTO } from '../DTOs/Product/ProductDTO';
import { CompanyDTO, NewCompanyDTO } from '../DTOs/Company/CompanyDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(
    private http: HttpClient
  ) { }

  GetAllProducts(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/BaseInformation/GetAllProducts')
  }
  GetAllActiveProducts(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/BaseInformation/GetAllActiveProducts')
  }
  SubmitNewProduct(model: NewProductDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewProduct', model)
  }
  SubmitEditProduct(model: NewProductDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitEditProduct', model)
  }
  DeleteProduct(id: number): Observable<any> {
    return this.http.get<any>('api/BaseInformation/DeleteProduct/' + id)
  }
  
  GetAllCompanies(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/BaseInformation/GetAllCompanies')
  }
  GetAllActiveComapanies(): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/BaseInformation/GetAllActiveComapanies')
  }
  SubmitNewCompany(model: CompanyDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewCompany', model)
  }
  SubmitEditCompany(model: NewCompanyDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitEditCompany', model)
  }
  DeleteCompany(id: number): Observable<any> {
    return this.http.get<any>('api/BaseInformation/DeleteCompany/' + id)
  }
}

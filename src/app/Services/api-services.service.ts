import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../Common/IResponseResult';
import { NewProductDTO, ProductDTO } from '../DTOs/Product/ProductDTO';
import { CompanyDTO, NewCompanyDTO } from '../DTOs/Company/CompanyDTO';
import { NewTaskDTO, TaskDTO } from '../DTOs/Tasks/TaskDTO';
import { ContryDTO, NewContryDTO } from '../DTOs/ContryProvince/ContryDTO';
import { NewProvinceDTO, ProvinceDTO } from '../DTOs/ContryProvince/ProvinceDTO';

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
  GetAllActiveComapanies(): Observable<IResponseResult<CompanyDTO[]>> {
    return this.http.get<IResponseResult<CompanyDTO[]>>('api/BaseInformation/GetAllActiveCompanies')
  }
  SubmitNewCompany(model: NewCompanyDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewCompany', model)
  }
  SubmitEditCompany(model: NewCompanyDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitEditCompany', model)
  }
  DeleteCompany(id: number): Observable<any> {
    return this.http.get<any>('api/BaseInformation/DeleteCompany/' + id)
  }

  SubmitNewTask(model: NewTaskDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewTask', model)
  }
  GetAllTodayTasksByUserId(userId: number): Observable<IResponseResult<TaskDTO[]>> {
    return this.http.get<IResponseResult<TaskDTO[]>>('api/BaseInformation/GetAllTodayTasksByUserId/' + userId)
  }

  GetAllContries(): Observable<IResponseResult<ContryDTO[]>> {
    return this.http.get<IResponseResult<ContryDTO[]>>('api/BaseInformation/GetAllContries')
  }
  GetAllActiveContries(): Observable<IResponseResult<ContryDTO[]>> {
    return this.http.get<IResponseResult<CompanyDTO[]>>('api/BaseInformation/GetAllActiveContries')
  }
  SubmitNewContry(model: NewContryDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewContry', model)
  }
  SubmitEditContry(model: NewContryDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitEditContry', model)
  }
  DeleteContry(id: number): Observable<any> {
    return this.http.get<any>('api/BaseInformation/DeleteContry/' + id)
  }
  GetAllProvince(contryId: number): Observable<IResponseResult<ProvinceDTO[]>> {
    return this.http.get<IResponseResult<ProvinceDTO[]>>('api/BaseInformation/GetAllProvince/' + contryId)
  }
  SubmitNewProvince(model: NewProvinceDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewProvince', model)
  }
  DeleteProvince(id: number): Observable<any> {
    return this.http.get<any>('api/BaseInformation/DeleteProvince/' + id)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../Common/IResponseResult';
import { NewProductDTO, ProductDTO } from '../DTOs/Product/ProductDTO';
import { CompanyDTO, NewCompanyDTO } from '../DTOs/Company/CompanyDTO';
import { NewTaskDTO, TaskDTO } from '../DTOs/Tasks/TaskDTO';
import { ContryDTO, NewContryDTO } from '../DTOs/ContryProvince/ContryDTO';
import { NewProvinceDTO, ProvinceDTO } from '../DTOs/ContryProvince/ProvinceDTO';
import { DsahboardDTO } from '../DTOs/Dashboard/DashboardDTO';

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
  GetAllActiveProducts(userId: number): Observable<IResponseResult<ProductDTO[]>> {
    return this.http.get<IResponseResult<ProductDTO[]>>('api/BaseInformation/GetAllActiveProducts/' + userId)
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

  GetAllCompanies(): Observable<IResponseResult<CompanyDTO[]>> {
    return this.http.get<IResponseResult<CompanyDTO[]>>('api/BaseInformation/GetAllCompanies')
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
  DeleteCompany(id: number): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/BaseInformation/DeleteCompany/' + id)
  }
  DeleteBrokerDetailRecord(id: number): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Brokers/DeleteBrokerDetailRecord/' + id)
  }

  SubmitNewTask(model: NewTaskDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewBrokerDetial', model)
  }
  SubmitEditBrokerDetailStatus(model: TaskDTO): Observable<any> {
    return this.http.post<any>('api/Brokers/SubmitEditBrokerDetailStatus', model)
  }
  SubmitPreSuccessStatus(model: TaskDTO): Observable<any> {
    return this.http.post<any>('api/Brokers/SubmitPreSuccessStatus', model)
  }
  GetAllTodayTasksByUserId(userId: number): Observable<IResponseResult<TaskDTO[]>> {
    return this.http.get<IResponseResult<TaskDTO[]>>('api/BaseInformation/GetAllTodayTasksByUserId/' + userId)
  }
  GetAllBrokerDataByUserId(userId: number): Observable<IResponseResult<TaskDTO[]>> {
    return this.http.get<IResponseResult<TaskDTO[]>>('api/Brokers/GetAllBrokerDataByUserId/' + userId)
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
  DeleteContry(id: number): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/BaseInformation/DeleteContry/' + id)
  }
  GetAllProvince(contryId: number): Observable<IResponseResult<ProvinceDTO[]>> {
    return this.http.get<IResponseResult<ProvinceDTO[]>>('api/BaseInformation/GetAllProvince/' + contryId)
  }
  GetAllActiveProvince(contryId: number): Observable<IResponseResult<ProvinceDTO[]>> {
    return this.http.get<IResponseResult<ProvinceDTO[]>>('api/BaseInformation/GetAllActiveProvince/' + contryId)
  }
  SubmitNewProvince(model: NewProvinceDTO): Observable<any> {
    return this.http.post<any>('api/BaseInformation/SubmitNewProvince', model)
  }
  DeleteProvince(id: number): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/BaseInformation/DeleteProvince/' + id)
  }

  GetDashboardData(): Observable<IResponseResult<DsahboardDTO>> {
    return this.http.get<IResponseResult<DsahboardDTO>>('api/BaseInformation/GetDashboardData')
  }
  GetAllCustomers(): Observable<IResponseResult<any>> {
    return this.http.get<IResponseResult<any>>('api/Account/GetAllBrokers');
  }
  GetAllRejected(): Observable<IResponseResult<TaskDTO[]>> {
    return this.http.get<IResponseResult<TaskDTO[]>>('api/Brokers/GetAllRejected')
  }
  GetAllPreSuccess(): Observable<IResponseResult<TaskDTO[]>> {
    return this.http.get<IResponseResult<TaskDTO[]>>('api/Brokers/GetAllPreSuccess')
  }
}

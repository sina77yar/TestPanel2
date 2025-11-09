import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './Pages/dashboard/dashboard';
import { ProductsComponent } from './Pages/products/products.component';
import { UsersComponent } from './Pages/users/users.component';
import { ContriesComponent } from './Pages/contries/contries.component';
import { CompanyComponent } from './Pages/company/company.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { NewuserComponent } from './Pages/users/newuser/newuser.component';
import { TasksComponent } from './Pages/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'products', component: ProductsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'newuser', component: NewuserComponent },
  { path: 'contries', component: ContriesComponent },
  { path: 'companies', component: CompanyComponent },
  { path: 'changepass', component: ChangePasswordComponent },
  { path: 'tasks', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}

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
import { AllMyTask } from './Pages/tasks/all-my-task/all-my-task';
import { LoginComponent } from './Pages/login/login.component';
import { authguardGuard } from './Utilities/authguard.guard';
import { loginGuard } from './Utilities/loginguard.guard';
import { adminGuard } from './Utilities/adminGuard.guard';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { HomeComponent } from './Pages/home/home.component';
import { WhiteListComponent } from './Pages/white-list/white-list.component';
import { PreSuccessComponent } from './Pages/pre-success/pre-success.component';

const routes: Routes = [
  { path: '', component: Dashboard , canActivate: [authguardGuard]},
  { path: 'dashboard', component: Dashboard , canActivate: [authguardGuard]},
  { path: 'products', component: ProductsComponent , canActivate: [authguardGuard, adminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authguardGuard, adminGuard] },
  { path: 'newuser', component: NewuserComponent, canActivate: [authguardGuard, adminGuard] },
  { path: 'contries', component: ContriesComponent, canActivate: [authguardGuard, adminGuard] },
  { path: 'companies', component: CompanyComponent, canActivate: [authguardGuard, adminGuard] },
  { path: 'whitelist', component: WhiteListComponent, canActivate: [authguardGuard, adminGuard] },
  { path: 'presuccess', component: PreSuccessComponent, canActivate: [authguardGuard, adminGuard] },
  { path: 'changepass', component: ChangePasswordComponent, canActivate: [authguardGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [authguardGuard] },
  { path: 'allmytasks', component: AllMyTask , canActivate: [authguardGuard]},
  { path: 'login', component: LoginComponent ,canActivate: [loginGuard] },


  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}

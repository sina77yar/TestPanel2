import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sidebar } from './Pages/Shared/sidebar/sidebar';
import { Dashboard } from './Pages/dashboard/dashboard';
import { Footer } from './Pages/Shared/footer/footer';
import { TasksComponent } from './Pages/tasks/tasks.component';
import { NewTaskComponent } from './Pages/tasks/new-task/new-task.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ContriesComponent } from './Pages/contries/contries.component';
import { CompanyComponent } from './Pages/company/company.component';
import { UsersComponent } from './Pages/users/users.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NewuserComponent } from './Pages/users/newuser/newuser.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service';
import { Interceptor } from './Utilities/Interceptor';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllMyTask } from './Pages/tasks/all-my-task/all-my-task';
import { LoginComponent } from './Pages/login/login.component';
import { SweetAlert2LoaderService, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AccessDeniedComponent } from './Pages/access-denied/access-denied.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { SelectModule } from 'primeng/select';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/Aura';
import { HomeComponent } from './Pages/home/home.component';
import { WhiteListComponent } from './Pages/white-list/white-list.component';
import { PersianDatePipe } from './pipes/persian-date.pipe';
import { PreSuccessComponent } from './Pages/pre-success/pre-success.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    App,
    Sidebar,
    Dashboard,
    Footer,
    // Sidebar,
    TasksComponent,
    NewTaskComponent,
    ProductsComponent,
    ContriesComponent,
    CompanyComponent,
    UsersComponent,
    ChangePasswordComponent,
    NewuserComponent,
    AllMyTask,
    LoginComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    HomeComponent,
    WhiteListComponent,
    PreSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    SelectModule,
    HttpClientModule,
    PersianDatePipe,
    CheckboxModule,
    TableModule
  ],
  providers: [
    CookieService, {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }, provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false, // مهم
          primary: 'blue',
          surface: 'light'
        }
      }
    })
  ],
  bootstrap: [App,
    //  Sidebar,
    Footer]
})
export class AppModule { }

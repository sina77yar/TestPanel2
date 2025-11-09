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

@NgModule({
  declarations: [
    App,
    Sidebar,
    Dashboard,
    Footer,
    TasksComponent,
    NewTaskComponent,
    ProductsComponent,
    ContriesComponent,
    CompanyComponent,
    UsersComponent,
    ChangePasswordComponent,
    NewuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App, Sidebar,
    Footer]
})
export class AppModule { }

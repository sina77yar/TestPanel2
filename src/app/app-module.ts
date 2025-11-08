import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sidebar } from './Pages/Shared/sidebar/sidebar';
import { Dashboard } from './Pages/dashboard/dashboard';
import { Footer } from './Pages/Shared/footer/footer';

@NgModule({
  declarations: [
    App,
    Sidebar,
    Dashboard,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App   , Sidebar,
    Dashboard,
    Footer]
})
export class AppModule { }

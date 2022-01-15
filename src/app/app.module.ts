import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './main-layout/components/dashboard/dashboard.component';
import { EmployeesListComponent } from './main-layout/components/employees-list/employees-list.component';
import { CreatePageComponent } from './main-layout/components/create-page/create-page.component';
import { EditPageComponent } from './main-layout/components/edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    DashboardComponent,
    EmployeesListComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

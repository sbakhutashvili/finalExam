import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {DashboardComponent} from "./main-layout/components/dashboard/dashboard.component";
import {EmployeesListComponent} from "./main-layout/components/employees-list/employees-list.component";
import {EditPageComponent} from "./main-layout/components/edit-page/edit-page.component";
import {CreatePageComponent} from "./main-layout/components/create-page/create-page.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'list',
        component: EmployeesListComponent
      },
      {
        path: 'create',
        component: CreatePageComponent
      },
      {
        path: 'edit/:id',
        component: EditPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

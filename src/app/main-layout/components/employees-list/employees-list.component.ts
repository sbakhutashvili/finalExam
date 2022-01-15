import { Component, OnInit } from '@angular/core';
import {Employees} from "../../../shared/employees.interface";
import {EmployeesService} from "../../../shared/employees.service";
import {map, Subscription} from "rxjs";
import {mockEmployees} from "../../../shared/mock-employees";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees: Employees[] = [];
  empSub: Subscription

  constructor(
    private empService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployees()
      .pipe(
        map(res => res.sort((a,b)=> a.id - b.id)),
      )
      .subscribe(emp => this.employees = emp);
  }

  remove(id: number) {
    this.empService.removeEmp(id)
      .subscribe(emp => {
        const idx = mockEmployees.findIndex(f => f.id === emp.id)
        mockEmployees.splice(idx, 1);
        this.employees = this.employees.filter(f => f.id !== emp.id)
      })
  }

  ngOnDestroy() {
    if (this.empSub) this.empSub.unsubscribe();
  }

}

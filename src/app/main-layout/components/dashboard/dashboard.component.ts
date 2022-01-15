import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from "../../../shared/employees.service";
import {Employees} from "../../../shared/employees.interface";
import {map, Subscription} from "rxjs";
import {mockEmployees} from "../../../shared/mock-employees";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  employees: Employees[] = [];
  empSub: Subscription | undefined;

  constructor(
    private empService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployees()
      .pipe(
        map(res => res.sort((a,b)=> b.salary - a.salary)),
      )
      .subscribe(emp => {
        this.employees = emp.slice(0,5);
      });
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

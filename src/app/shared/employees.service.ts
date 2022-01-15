import {Injectable} from '@angular/core';
import {delay, map, Observable, of, tap} from "rxjs";
import {Employees} from "./employees.interface";
import {mockEmployees} from "./mock-employees";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  getEmployees(): Observable<Employees[]> {
    return of(mockEmployees)
      .pipe(
        delay(500)
      );
  }

  getEmployeesById(id: number) {
    return of(mockEmployees.find(f => f.id == id))
      .pipe(
        map((emp) => {
          return {
            ...emp,
            id
          }
        })
      )
  }

  removeEmp(id: number): Observable<Employees> {
    // @ts-ignore
    return of(mockEmployees.find(f => f.id == id))
  }
}

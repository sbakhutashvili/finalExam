import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {EmployeesService} from "../../../shared/employees.service";
import {Employees} from "../../../shared/employees.interface";
import {mockEmployees} from "../../../shared/mock-employees";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  employee: Employees;
  employees: Employees[];

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.empService.getEmployeesById(params['id'])
        })
      )
      .subscribe(emp => {
        // @ts-ignore
        this.employee = emp
        this.form.patchValue({
          firstName: emp.firstName,
          lastName: emp.lastName,
          salary: emp.salary,
          positionName: emp.positionName
        })
      })
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      positionName: new FormControl('', Validators.required),
    })
  }

  update() {
    if (this.form.invalid) return

    this.submitted = true;

    const employee: Employees = {
      id: this.employee.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      salary: this.form.value.salary,
      positionName: this.form.value.positionName
    }
    let idx = mockEmployees.findIndex(f => f.id === this.employee.id)


    // @ts-ignore
    mockEmployees = mockEmployees.splice(mockEmployees[idx], 1, employee);
    this.router.navigate(['', 'list']);
  }

}

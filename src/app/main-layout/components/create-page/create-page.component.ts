import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Employees} from "../../../shared/employees.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeesService} from "../../../shared/employees.service";
import {mockEmployees} from "../../../shared/mock-employees";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  employee: Employees;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      positionName: new FormControl('', Validators.required),
    })
  }

  create() {
    if (this.form.invalid) return

    this.submitted = true;

    const employee: Employees = {
      id: mockEmployees.length + 1,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      salary: this.form.value.salary,
      positionName: this.form.value.positionName
    }
    console.log(employee)
    mockEmployees.push(employee)
    this.router.navigate(['', 'list']);
  }

}

import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EmployeeService } from '../employee/employee.service';
import { UnitService } from '../unit/unit.service';


@Injectable({ providedIn: 'root' })
export class ExistingEmailsService {

  constructor(private employeeService: EmployeeService, private unitService: UnitService) { }

  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.employeeService.checkEmail(control.value).pipe(
        
        map(isDuplicate => (isDuplicate ? { 'emailExists': true } : null)),
        catchError(() => of(null)) 
      );
    };
  }
  validateNameUnit(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.unitService.checkUnitName(control.value).pipe(
        
        map(isDuplicate => (isDuplicate ? { 'nameExists': true } : null)),
        catchError(() => of(null)) 
      );
    };
  }
}

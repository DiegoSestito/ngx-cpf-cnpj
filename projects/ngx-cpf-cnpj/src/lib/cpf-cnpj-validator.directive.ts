import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, FormControl } from '@angular/forms';
import { NgxCpfCnpjService } from './ngx-cpf-cnpj.service';

@Directive({
  selector: '[nccCpfCnpjValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CpfCnpjValidatorDirective,
      multi: true
    }]
})
export class CpfCnpjValidatorDirective implements Validator  {

  validator: ValidatorFn;
  private cpfCnpjService: NgxCpfCnpjService = new NgxCpfCnpjService();
  constructor() {
    this.validator = this.cpfCnpjValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  cpfCnpjValidator(): ValidatorFn {
    return (c: FormControl) => {
      let value: string = <string>c.value;
      if (value != null) {
        value = this.cpfCnpjService.getDigitos(value);
        if (value.length === 11) {
          if (this.cpfCnpjService.cpfIsValid(value)) {
            return null;
          } else {
            return {
              cpfcnpjvalidator: {
                valid: false
              }
            };
          }
        } else if (value.length === 14) {
          if (this.cpfCnpjService.cnpjIsValid(value)) {
            return null;
          } else {
            return {
              cpfcnpjvalidator: {
                valid: false
              }
            };
          }
        }
      }

      return {
        cpfcnpjvalidator: {
          valid: false
        }
      };
    };
  }
}

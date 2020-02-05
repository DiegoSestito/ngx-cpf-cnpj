import { Directive } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  FormControl
} from "@angular/forms";
import { NgxCpfCnpj } from "./ngx-cpf-cnpj";

@Directive({
  selector: "[nccCpfCnpjValidator] [ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CpfCnpjValidatorDirective,
      multi: true
    }
  ]
})
export class CpfCnpjValidatorDirective implements Validator {
  validator: ValidatorFn;
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
        value = NgxCpfCnpj.getDigitos(value);
        if (value.length === 11) {
          if (NgxCpfCnpj.cpfIsValid(value)) {
            return null;
          } else {
            return {
              cpfcnpjvalidator: {
                valid: false
              }
            };
          }
        } else if (value.length === 14) {
          if (NgxCpfCnpj.cnpjIsValid(value)) {
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

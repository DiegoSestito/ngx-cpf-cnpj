import { FormControl } from "@angular/forms";
import { NgxCpfCnpj } from "./ngx-cpf-cnpj";

export interface ValidationResult {
  [key: string]: boolean;
}

export class CpfCnpjValidator {
  public static validate(control: FormControl): ValidationResult {
    return NgxCpfCnpj.cpfIsValid(control.value) ? null : { invalid: false };
  }
}

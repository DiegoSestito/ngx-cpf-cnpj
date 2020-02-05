import { NgModule } from "@angular/core";
import { CpfCnpjMaskDirective } from "./cpf-cnpj-mask.directive";
import { CpfCnpjValidatorDirective } from "./cpf-cnpj-validator.directive";
import { CpfCnpjValidator } from "./cpf-cnpj.validator";

@NgModule({
  declarations: [
    CpfCnpjMaskDirective,
    CpfCnpjValidatorDirective,
    CpfCnpjValidator
  ],
  imports: [],
  exports: [CpfCnpjMaskDirective, CpfCnpjValidatorDirective, CpfCnpjValidator]
})
export class NgxCpfCnpjModule {}

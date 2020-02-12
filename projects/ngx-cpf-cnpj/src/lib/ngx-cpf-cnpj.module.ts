import { NgModule } from "@angular/core";
import { CpfCnpjMaskDirective } from "./cpf-cnpj-mask.directive";
import { CpfCnpjValidatorDirective } from "./cpf-cnpj-validator.directive";

@NgModule({
  declarations: [CpfCnpjMaskDirective, CpfCnpjValidatorDirective],
  imports: [],
  exports: [CpfCnpjMaskDirective, CpfCnpjValidatorDirective]
})
export class NgxCpfCnpjModule {}

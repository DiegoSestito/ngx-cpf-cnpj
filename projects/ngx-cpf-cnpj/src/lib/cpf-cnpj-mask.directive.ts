import { Directive, HostListener } from "@angular/core";
import { NgModel } from "@angular/forms";
import { NgxCpfCnpjService } from "./ngx-cpf-cnpj.service";
@Directive({
  selector: "[nccCpfCnpjMask] [ngModel]",
  providers: [NgModel]
})
export class CpfCnpjMaskDirective {
  constructor(
    private model: NgModel,
    private cpfCnpjService: NgxCpfCnpjService
  ) {}

  @HostListener("input", ["$event"]) onInput(event) {
    if (event.target.value.length <= 18) {
      this.model.valueAccessor.writeValue(
        this.cpfCnpjService.convertToCpfCnpj(event.target.value)
      );
    }
  }
}

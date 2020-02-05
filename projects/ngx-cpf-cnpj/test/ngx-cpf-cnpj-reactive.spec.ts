import { OnInit, Component, DebugElement } from "@angular/core";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CpfCnpjValidator } from "../src/lib/cpf-cnpj.validator";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  // tslint:disable-next-line:max-line-length
  template: `
    <form (submit)="submitReactive(formTest)" [formGroup]="formTest">
      <input
        id="cpfCnpjReactive"
        name="cpfCnpj"
        formControlName="cpfCnpj"
        type="text"
        nccCpfCnpjMask
      />
    </form>
  `
})
export class NgxCpfCpnjTestComponent implements OnInit {
  public formTest: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formTest = this.fb.group({
      cpfCnpj: ["", CpfCnpjValidator.validate]
    });
  }
}

let component: NgxCpfCpnjTestComponent;
let fixture: ComponentFixture<NgxCpfCpnjTestComponent>;
let inputEl: DebugElement;

describe("CpfCnpjReactive Validator", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxCpfCpnjTestComponent],
      imports: [ReactiveFormsModule]
    });

    fixture = TestBed.createComponent(NgxCpfCpnjTestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it("Should invalidate a not valide CPF", async(() => {
    component.formTest.controls["cpfCnpj"].setValue("454.568.455-88");
    expect(component.formTest.controls.cpfCnpj.valid).toBeFalsy();
  }));

  it("Should validate a valide CPF", async(() => {
    component.formTest.controls["cpfCnpj"].setValue("974.345.684-88");
    expect(component.formTest.controls.cpfCnpj.valid).toBeTruthy();
  }));

  it("Should invalidate a not valide CNPJ", async(() => {
    component.formTest.controls["cpfCnpj"].setValue("50.112.132/0001-81");
    expect(component.formTest.controls.cpfCnpj.valid).toBeFalsy();
  }));

  it("Should validate a valide CNPJ", async(() => {
    component.formTest.controls["cpfCnpj"].setValue("50.612.470/0001-84");
    expect(component.formTest.controls.cpfCnpj.valid).toBeFalsy();
  }));
});

# Cpf and Cnpj Mask and Validator for Angular

This is a simple library, containing a mask and a validator for CPF/CNPJ in the same input.

## Installation

`npm install --save ngx-cpf-cnpj`

## Quickstart

```typescript
    import { NgxCpfCnpjModule } from  'ngx-cpf-cnpj';
    (...)
    @NgModule({
    (...)
    imports: [
    NgxCpfCnpjModule]
    (...)
    })
```

### Usage Template Form

Simple Mask:

```Html
<input nccCpfCnpjMask  [(ngModel)]="test" >
```

Mask and Validator:

```Html
 <input  name="cpfCnpj"  type="text"  nccCpfCnpjValidator  name="cpfCnpj"  #cpfCnpjv="ngModel"  nccCpfCnpjMask  [(ngModel)]="teste"  >
```

Form Exemple:

```Html
<form  (submit)="submitTest()"  #testForm="ngForm">
    <input  name="cpfCnpj"  type="text"  nccCpfCnpjValidator  name="cpfCnpj"  #cpfCnpjv="ngModel"  nccCpfCnpjMask  [(ngModel)]="teste"  >
    <button  type="submit">Submit</button>
    <div  padding  *ngIf="testForm.submitted && cpfCnpjv?.invalid"  class="error">
        Cpf/Cnpj Inválido
    </div>
</form>
```

### Usage Reactive Form:

```typescript
export class AppComponent implements OnInit {
  private formTest: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formTest = this.fb.group({
      cpfCnpj: ["", CpfCnpjValidator.validate]
    });
  }

  submitReactive() {
    console.log("submit", this.formTest.value.cpfCnpj);
  }
}
```

```Html
<form (submit)="submitReactive(formTest)" [formGroup]="formTest">
  <input
    id="cpfCnpjReactive"
    name="cpfCnpj"
    formControlName="cpfCnpj"
    type="text"
    nccCpfCnpjMask
  />
  <button type="submit">Submit</button>
  <div *ngIf="formTest.controls.cpfCnpj.errors">
    Cpf/Cnpj Inválido
  </div>
</form>
```

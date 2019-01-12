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
### Usage
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
 
     

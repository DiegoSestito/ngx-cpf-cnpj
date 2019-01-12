import { CpfCnpjMaskDirective } from '../src/lib/cpf-cnpj-mask.directive';
import {TestBed, ComponentFixture, tick, async} from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CpfCnpjValidatorDirective } from '../src/lib/cpf-cnpj-validator.directive';

@Component({
  // tslint:disable-next-line:max-line-length
  template: '<form #myForm="ngForm"><input type="text" nccCpfCnpjValidator name="cpfCnpj" #cpfCnpjv="ngModel" nccCpfCnpjMask [ngModel]="test"></form>'
})
export class NgxCpfCpnjTestComponent {
    public test: string;
}

let component: NgxCpfCpnjTestComponent;
let fixture: ComponentFixture<NgxCpfCpnjTestComponent>;
let inputEl: DebugElement;

describe('Directive: CpfCnpjMask', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CpfCnpjMaskDirective, NgxCpfCpnjTestComponent],
        imports: [FormsModule]
      });

    fixture = TestBed.createComponent(NgxCpfCpnjTestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    });

    it('input a 12 length digit string, should return formatted CPF', async(() => {
      inputEl.nativeElement.value = '29747721457';
      expect(inputEl.nativeElement.value).toBe('29747721457');
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect( inputEl.nativeElement.value).toBe('297.477.214-57');
    }));

    it('input a 14 length digit string, should return formatted CNPJ', async(() => {
      inputEl.nativeElement.value = '50612470000184';
      expect(inputEl.nativeElement.value).toBe('50612470000184');
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(inputEl.nativeElement.value).toBe('50.612.470/0001-84');
    }));
  });

  describe('Directive: CpfCnpjValidator', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CpfCnpjValidatorDirective, NgxCpfCpnjTestComponent],
        imports: [FormsModule]
      });

    fixture = TestBed.createComponent(NgxCpfCpnjTestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    });

    it('Should invalidate a not valide CPF', async(() => {
      inputEl.nativeElement.value = '454.568.455-88';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputEl.references['cpfCnpjv'].valid).toBe(false);
      });
    }));

    it('Should validate a valide CPF', async(() => {
      inputEl.nativeElement.value = '974.345.684-88';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(inputEl.references['cpfCnpjv'].valid).toBe(true);
    }));

    it('Should invalidate a not valide CNPJ', async(() => {
      inputEl.nativeElement.value = '50.112.132/0001-81';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputEl.references['cpfCnpjv'].valid).toBe(false);
      });
    }));

    it('Should validate a valide CNPJ', async(() => {
      inputEl.nativeElement.value = '50.612.470/0001-84';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(inputEl.references['cpfCnpjv'].valid).toBe(true);
    }));
  });


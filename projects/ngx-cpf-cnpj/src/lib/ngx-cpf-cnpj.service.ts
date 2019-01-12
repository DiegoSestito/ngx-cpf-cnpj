import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxCpfCnpjService {

  constructor() { }

  convertToCpfCnpj(num) {
    if (num) {
      num = num.toString();
      num = this.getDigitos(num);
      switch (num.length) {
        case 4:
          num = num.replace(/(\d+)(\d{3})/, '$1.$2');
          break;
        case 5:
          num = num.replace(/(\d+)(\d{3})/, '$1.$2');
          break;
        case 6:
          num = num.replace(/(\d+)(\d{3})/, '$1.$2');
          break;
        case 7:
          num = num.replace(/(\d+)(\d{3})(\d{3})/, '$1.$2.$3');
          break;
        case 8:
          num = num.replace(/(\d+)(\d{3})(\d{3})/, '$1.$2.$3');
          break;
        case 9:
          num = num.replace(/(\d+)(\d{3})(\d{3})/, '$1.$2.$3');
          break;
        case 10:
          num = num.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
          break;
        case 11:
          num = num.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
          break;
        case 12:
          num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
          break;
        case 13:
          num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
          break;
        case 14:
          num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
          break;
      }
    }
    return num;
  }

  getDigitos(value) {
    return value.replace(/\D/g, '');
  }

  cpfIsValid(value): boolean {
    // Só faz a validação se o texto não for vazio.
    // Se for vazio, validar campo requerido não é a responsabilidade desta validação
    if (value.length > 0) {
      let IsValid = false;
      const cpf = this.getDigitos(value); // Obtém o texto digitado no campo, remove tudo menos os digitos
      if (cpf.length === 11) { // Se digitou o CPF por completo
        // Verificação dos CPF's que não respeitam a regra de validação mas não são válidos
        const cpf_invalidos = ['00000000000', '11111111111', '22222222222', '33333333333',
        '44444444444', '55555555555', '66666666666', '77777777777',
        '88888888888', '99999999999'];
        for (let i = 0; i < 10; i++) {
          if (cpf === cpf_invalidos[i]) { return IsValid; }
        }

        // Calculando o Primeiro Dígito Verificador
        let soma = 0; // Soma para o CPF "ABC.DEF.GHI-XZ": (A*10)+(B*9)+...+(H*3)+(I*2)
        for (let i = 0; i < 9; i++) {
          soma = soma + (parseInt(cpf.charAt(i), 10) * (10 - i));
        }
        let dv = 0; // Primeiro dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if ((soma % 11) > 1) {
          dv = 11 - (soma % 11);
        }

        if (parseInt(cpf.charAt(9), 10) !== dv) { return IsValid; }

        // Calculando o Segundo Dígito Verificador
        soma = 0; // Soma para o CPF "ABC.DEF.GHI-XZ": (A*11)+(B*10)+...+(H*4)+(I*3)+(X*2)
        for (let i = 0; i < 10; i++) {
          soma = soma + (parseInt(cpf.charAt(i), 10) * (11 - i));
        }
        dv = 0; // Segundo dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if ((soma % 11) > 1) {
          dv = 11 - (soma % 11);
        }

        if (parseInt(cpf.charAt(10), 10) !== dv) { return IsValid; }

        IsValid = true;
      }
      return IsValid;
    }
    return true;
  }

  cnpjIsValid(value): boolean {
    // Só faz a validação se o texto não for vazio.
    // Se for vazio, validar campo requerido não é a responsabilidade desta validação
    if (value.length > 0) {
      let IsValid = false;
      const cnpj = this.getDigitos(value); // Obtém o texto digitado no campo, remove tudo menos os digitos

      if (cnpj.length === 14) { // Se digitou o CNPJ por completo
        // Verificação do CNPJ que não respeita a regra de validação mas não são válidos
        if (cnpj === '00000000000000') { return IsValid; }

        // Calculando o Primeiro Dígito Verificador
        let soma = 0; // Soma para o CNPJ "AB.CDE.FGH/IJKL-XZ": (A*5)+(B*4)+(C*3)+(D*2)+(E*9)+(F*8)+...+(K*3)+(L*2)
        let mult = 5; // multiplicador
        for (let i = 0; i < 12; i++) {
          soma = soma + (parseInt(cnpj.charAt(i), 10) * (mult));
          mult--; // decrementa o multiplicador
          if (mult === 1) { mult = 9; } // volta o multiplicador para o valor 9 (para decrementar até o valor 2)
        }
        let dv = 0; // Primeiro dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if ((soma % 11) > 1) {
          dv = 11 - (soma % 11);
        }
        if (parseInt(cnpj.charAt(12), 10) !== dv) { return IsValid; }

        // Calculando o Segundo Dígito Verificador
        soma = 0; // Soma para o CNPJ "AB.CDE.FGH/IJKL-XZ": (A*6)+(B*5)+(C*4)+(D*3)+(E*2)+(F*9)+...+(K*4)+(L*3)+(X*2)
        mult = 6; // multiplicador
        for (let i = 0; i < 13; i++) {
          soma = soma + (parseInt(cnpj.charAt(i), 10) * (mult));
          mult--; // decrementa o multiplicador
          if (mult === 1) { mult = 9; } // volta o multiplicador para o valor 9 (para decrementar até o valor 2)
        }
        dv = 0; // Segundo dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if ((soma % 11) > 1) {
          dv = 11 - (soma % 11);
        }
        if (parseInt(cnpj.charAt(13), 10) !== dv) { return IsValid; }

        IsValid = true;
      }
      return IsValid;
    }
    return true;
  }
}

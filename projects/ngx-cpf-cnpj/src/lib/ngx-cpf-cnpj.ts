export class NgxCpfCnpj {
  constructor() {}

  public static convertToCpfCnpj(num) {
    if (num && num.length <= 14) {
      const replaceByLength = {
        4: { searchValue: /(\d+)(\d{3})/, newValue: "$1.$2" },
        5: { searchValue: /(\d+)(\d{3})/, newValue: "$1.$2" },
        6: { searchValue: /(\d+)(\d{3})/, newValue: "$1.$2" },
        7: { searchValue: /(\d+)(\d{3})(\d{3})/, newValue: "$1.$2.$3" },
        8: { searchValue: /(\d+)(\d{3})(\d{3})/, newValue: "$1.$2.$3" },
        9: { searchValue: /(\d+)(\d{3})(\d{3})/, newValue: "$1.$2.$3" },
        10: {
          searchValue: /(\d+)(\d{3})(\d{3})(\d{1})/,
          newValue: "$1.$2.$3-$4"
        },
        11: {
          searchValue: /(\d+)(\d{3})(\d{3})(\d{2})/,
          newValue: "$1.$2.$3-$4"
        },
        12: {
          searchValue: /(\d+)(\d{3})(\d{3})(\d{4})/,
          newValue: "$1.$2.$3-$4"
        },
        13: {
          searchValue: /(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/,
          newValue: "$1.$2.$3/$4-$5"
        },
        14: {
          searchValue: /(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/,
          newValue: "$1.$2.$3/$4-$5"
        }
      };

      num = num.toString();
      num = NgxCpfCnpj.getDigitos(num);
      const replaceObject = replaceByLength[num.length];
      num = num.replace(replaceObject.searchValue, replaceObject.newValue);
    }
    return num;
  }

  public static getDigitos(value) {
    const regex = new RegExp("\\D", "g");
    return value.replace(regex, "");
  }

  public static cpfIsValid(value): boolean {
    // Só faz a validação se o texto não for vazio.
    // Se for vazio, validar campo requerido não é a responsabilidade desta validação
    if (value.length > 0) {
      let IsValid = false;
      const cpf = NgxCpfCnpj.getDigitos(value); // Obtém o texto digitado no campo, remove tudo menos os digitos
      if (cpf.length === 11) {
        // Se digitou o CPF por completo
        // Verificação dos CPF's que não respeitam a regra de validação mas não são válidos
        const cpf_invalidos = [
          "00000000000",
          "11111111111",
          "22222222222",
          "33333333333",
          "44444444444",
          "55555555555",
          "66666666666",
          "77777777777",
          "88888888888",
          "99999999999"
        ];
        for (let i = 0; i < 10; i++) {
          if (cpf === cpf_invalidos[i]) {
            return IsValid;
          }
        }

        // Calculando o Primeiro Dígito Verificador
        let soma = 0; // Soma para o CPF "ABC.DEF.GHI-XZ": (A*10)+(B*9)+...+(H*3)+(I*2)
        for (let i = 0; i < 9; i++) {
          soma = soma + parseInt(cpf.charAt(i), 10) * (10 - i);
        }
        let dv = 0; // Primeiro dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if (soma % 11 > 1) {
          dv = 11 - (soma % 11);
        }

        if (parseInt(cpf.charAt(9), 10) !== dv) {
          return IsValid;
        }

        // Calculando o Segundo Dígito Verificador
        soma = 0; // Soma para o CPF "ABC.DEF.GHI-XZ": (A*11)+(B*10)+...+(H*4)+(I*3)+(X*2)
        for (let i = 0; i < 10; i++) {
          soma = soma + parseInt(cpf.charAt(i), 10) * (11 - i);
        }
        dv = 0; // Segundo dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if (soma % 11 > 1) {
          dv = 11 - (soma % 11);
        }

        if (parseInt(cpf.charAt(10), 10) !== dv) {
          return IsValid;
        }

        IsValid = true;
      }
      return IsValid;
    }
    return true;
  }

  public static cnpjIsValid(value): boolean {
    // Só faz a validação se o texto não for vazio.
    // Se for vazio, validar campo requerido não é a responsabilidade desta validação
    if (value.length > 0) {
      let IsValid = false;
      const cnpj = NgxCpfCnpj.getDigitos(value); // Obtém o texto digitado no campo, remove tudo menos os digitos

      if (cnpj.length === 14) {
        // Se digitou o CNPJ por completo
        // Verificação do CNPJ que não respeita a regra de validação mas não são válidos
        if (cnpj === "00000000000000") {
          return IsValid;
        }

        // Calculando o Primeiro Dígito Verificador
        let soma = 0; // Soma para o CNPJ "AB.CDE.FGH/IJKL-XZ": (A*5)+(B*4)+(C*3)+(D*2)+(E*9)+(F*8)+...+(K*3)+(L*2)
        let mult = 5; // multiplicador
        for (let i = 0; i < 12; i++) {
          soma = soma + parseInt(cnpj.charAt(i), 10) * mult;
          mult--; // decrementa o multiplicador
          if (mult === 1) {
            mult = 9;
          } // volta o multiplicador para o valor 9 (para decrementar até o valor 2)
        }
        let dv = 0; // Primeiro dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if (soma % 11 > 1) {
          dv = 11 - (soma % 11);
        }
        if (parseInt(cnpj.charAt(12), 10) !== dv) {
          return IsValid;
        }

        // Calculando o Segundo Dígito Verificador
        soma = 0; // Soma para o CNPJ "AB.CDE.FGH/IJKL-XZ": (A*6)+(B*5)+(C*4)+(D*3)+(E*2)+(F*9)+...+(K*4)+(L*3)+(X*2)
        mult = 6; // multiplicador
        for (let i = 0; i < 13; i++) {
          soma = soma + parseInt(cnpj.charAt(i), 10) * mult;
          mult--; // decrementa o multiplicador
          if (mult === 1) {
            mult = 9;
          } // volta o multiplicador para o valor 9 (para decrementar até o valor 2)
        }
        dv = 0; // Segundo dígito verificador (será zero se o resto da divisão de soma por 11 for < 2)
        if (soma % 11 > 1) {
          dv = 11 - (soma % 11);
        }
        if (parseInt(cnpj.charAt(13), 10) !== dv) {
          return IsValid;
        }

        IsValid = true;
      }
      return IsValid;
    }
    return true;
  }
}

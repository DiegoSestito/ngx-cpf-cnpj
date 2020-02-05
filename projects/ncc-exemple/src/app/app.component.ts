import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CpfCnpjValidator } from "projects/ngx-cpf-cnpj/src/lib/cpf-cnpj.validator";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ncc-exemple";
  private teste: string;
  private formTest: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formTest = this.fb.group({
      cpfCnpj: ["", CpfCnpjValidator.validate]
    });
  }

  submitTest() {
    console.log("submit", this.teste);
  }

  submitReactive() {
    console.log("submit", this.formTest.value.cpfCnpj);
  }
}

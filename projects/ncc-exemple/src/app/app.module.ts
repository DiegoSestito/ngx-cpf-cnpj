import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { NgxCpfCnpjModule } from "ngx-cpf-cnpj";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxCpfCnpjModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

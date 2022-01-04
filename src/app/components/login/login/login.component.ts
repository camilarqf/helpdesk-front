import { Credenciais } from "./../../../models/credenciais";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  login: Credenciais = {
    email: "",
    senha: "",
  }
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  constructor(private toastr:ToastrService) {}

  ngOnInit(): void {}

  logar(){
    this.toastr.error("Usuário e/ou senha inválidos!", "Login")
    this.login.senha = "";
  }

  validaCampos():boolean {
    if(this.email.valid && this.senha.valid){
      return true;
    }
    return false;
  }
}

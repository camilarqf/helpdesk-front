import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Credenciais } from "../../../../models/credenciais";
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
  };
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logar() {
    this.service.authenticate(this.login).subscribe(
      (response) => {
        this.service.successfulLogin(
          response.headers.get("Authorization").substring(7)
        );
        this.router.navigate([""]);
      },
      () => {
        this.toastr.error("Usuário e/ou senha inválidos!");
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}

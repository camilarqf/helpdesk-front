import { Router } from "@angular/router";
import { Chamado } from "./../../../../models/chamado";
import { ChamadoService } from "./../../../services/chamado.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Cliente } from "src/models/cliente";

import { Tecnico } from "./../../../../models/tecnico";
import { ClienteService } from "./../../../services/cliente.service";
import { TecnicoService } from "./../../../services/tecnico.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    id: "",
    dataAbertura: "",
    dataFechamento: "",
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeTecnico: "",
    nomeCliente: "",
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  titulo: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe((response) => {
      this.clientes = response;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((response) => {
      this.tecnicos = response;
    });
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(
      (response) => {
        this.toastr.success("Chamado criado com sucesso", "Novo chamado");
        this.router.navigate(["chamados"]);
      },
      (ex) => {
        this.toastr.error(ex.error.error);
      }
    );
  }

  validaCampos(): boolean {
    return (
      this.cliente.valid &&
      this.observacoes.valid &&
      this.prioridade.valid &&
      this.status.valid &&
      this.tecnico.valid &&
      this.titulo.valid
    );
  }
}

import { Tecnico } from '../../../../models/tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [{
    id: 1,
    nome: 'Teste',
    cpf: "123.456.789-10",
    email: "teste@email.com",
    senha: "1234",
    perfis: ['0'],
    dataCriacao: "03/01/2022"
  }]

  displayedColumns: string[] = ['ID', 'nome', 'CPF', 'Email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

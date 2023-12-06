import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { TIpoDocumentoData } from '../../data/tipo-documento.data';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClienteComponent implements OnInit, OnDestroy {
  columnsToDisplay =  ['numeroDocumento', 'nombres', 'sexo', 'email', 'telefono'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;

  tabla = 'cliente';
  loading: boolean = true;
  listado: any = [];
  encabezado = {
    "title": 'Clientes',
    "subtitle": 'Listado de clientes regitrados'
  };

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();

  listadoTipoDocumentos = JSON.parse(JSON.stringify(TIpoDocumentoData)).tipos;

  constructor(private utilService: UtilService,
    private generalService: GeneralService) {
  }

  async ngOnInit(): Promise<void> {
    // await this.cargarSelects();
    await this.cargarListadoApi();
    await this.mapearListado();
    this.cargarDataSourceTable(this.listado);
  }

  ngOnDestroy(): void {
  }

  async cargarListadoApi() {
    this.listado = await this.generalService.getAllApi(this.tabla);
  }

  cargarDataSourceTable(listado: any) {
    this.dataSource = new MatTableDataSource(listado);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Una vez eliminado, no puedes revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService.delete(id, this.tabla).subscribe((res) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido borrado.',
            'success'
          ).then(() => {
            this.utilService.reloadCurrentRoute();
          });
        });
      }
    });
  }

  mapearListado() {
    let listadoAux = JSON.parse(JSON.stringify(this.listado));
    for (let x of listadoAux) {
      x.tipoDocumento = this.listadoTipoDocumentos.filter((data: any) => {
        return data.id == x.tipoDocumento
      })[0];
    }
    this.listado = listadoAux;
    console.log(this.listado);
  }
}

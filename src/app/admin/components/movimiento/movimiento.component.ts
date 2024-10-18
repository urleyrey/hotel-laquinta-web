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
import { HabitacionService } from 'src/app/core/services/api/habitacion.service';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { configReserva } from '../reserva/reserva.config';
import { TipoMovimientoData } from '../../data/tipo-movimiento.data';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MovimientoComponent {

  columnsToDisplay =  ['fecha', 'valor', 'tipoMovimiento', 'producto'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  tabla = 'movimiento';
  loading: boolean = true;
  listado: any = [];
  encabezado = {
    "title": 'Movimiento',
    "subtitle": 'Listado de movimientos regitrados'
  };

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();

  cargadoEstadoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoEstadoHabitacion: any;
  cargadoTipoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoTipoHabitacion: any;
  cargadoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoHabitacion: any;
  cargadoTipoServicio$: Observable<boolean> = new Observable<boolean>;
  listadoTipoServicio: any;
  cargadoReserva$: Observable<boolean> = new Observable<boolean>;
  listadoRecepcion: any;
  listadoProducto: any;
  listadoCliente: any;

  listadoEstadoReservas = JSON.parse(JSON.stringify(configReserva)).estados;
  listadoTipoMovimientos = JSON.parse(JSON.stringify(TipoMovimientoData)).tipos;

  constructor(private habitacionService: HabitacionService,
    private utilService: UtilService,
    private generalService: GeneralService) {
  }

  async ngOnInit(): Promise<void> {
    await this.cargarSelects();
    await this.cargarListadoApi();
    console.log("PRUEBA:", this.listado);
    await this.mapearRecepcion();
    await this.mapearListado();
    this.cargarDataSourceTable(this.listado);
  }

  async cargarSelects() {
    await this.cargarProducto();
    await this.cargarHabitacion();
    await this.cargarRecepcion();
    await this.cargarTipoHabitacion();
    await this.cargarCliente();
  }

  cargarListado() {
    this.cargarListadoApi();
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

  public async cargarProducto() {
    await this.cargarListadoDesdeApi('producto');
  }

  public async cargarRecepcion() {
    await this.cargarListadoDesdeApi('recepcion');
  }

  public async cargarHabitacion() {
    await this.cargarListadoDesdeApi('habitacion');
  }

  public async cargarTipoHabitacion() {
    await this.cargarListadoDesdeApi('tipo-habitacion');
  }

  public async cargarCliente() {
    await this.cargarListadoDesdeApi('cliente');
  }

  async cargarListadoDesdeApi(tabla: string) {
    if(tabla == 'producto'){
      this.listadoProducto = await this.generalService.getAllApi(tabla);
    }
    if(tabla == 'recepcion'){
      this.listadoRecepcion = await this.generalService.getAllApi(tabla);
    }
    if(tabla == 'habitacion'){
      this.listadoHabitacion = await this.generalService.getAllApi(tabla);
    }
    if(tabla == 'tipo-habitacion'){
      this.listadoTipoHabitacion = await this.generalService.getAllApi(tabla);
    }
    if(tabla == 'cliente'){
      this.listadoCliente = await this.generalService.getAllApi(tabla);
    }
  }

  mapearListado() {
    console.log(this.listadoRecepcion);
    let listadoAux = JSON.parse(JSON.stringify(this.listado));
    for (let x of listadoAux) {
      x.producto = this.utilService.getObjeto(x.producto, this.listadoProducto);
      
      // let recepcion = JSON.parse(JSON.stringify(x.recepcion));
      // recepcion.habitacion = this.utilService.getObjeto(x.recepcion.habitacion, this.listadoHabitacion);
      // x.recepcion = recepcion;
      x.recepcion = x.recepcion == '0' ? '0':this.utilService.getObjeto(x.recepcion, this.listadoRecepcion);
      console.log("FOR:",x.recepcion, this.listadoRecepcion);
      x.tipoMovimiento = this.listadoTipoMovimientos.filter((data: any) => {
        return data.id == x.tipoMovimiento
      })[0];
    }
    this.listado = listadoAux;
    console.log("LISTADO: ", this.listado);
  }

  mapearRecepcion() {
    let listadoAux = JSON.parse(JSON.stringify(this.listadoRecepcion));
    for (let x of listadoAux) {
      x.habitacion = this.utilService.getObjeto(x.habitacion, this.listadoHabitacion);
      let habitacion = JSON.parse(JSON.stringify(x.habitacion));
      habitacion.tipoHabitacion = this.utilService.getObjeto(x.habitacion.tipoHabitacion, this.listadoTipoHabitacion);
      x.habitacion = habitacion;
      x.estado = this.listadoEstadoReservas.filter((data: any) => {
        return data.id == x.estado
      })[0];
      x.cliente = this.utilService.getObjeto(x.cliente, this.listadoCliente);
    }
    this.listadoRecepcion = listadoAux;
    console.log("MAPEAR RECEPCION:", this.listadoRecepcion);
  }

}

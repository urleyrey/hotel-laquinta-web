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
import { Store } from '@ngrx/store';
import { changeHabitacion } from 'src/app/state/actions/habitacion.actions';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { TipoHabitacionService } from 'src/app/core/services/api/tipo-habitacion.service';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { TipoServicioService } from 'src/app/core/services/api/tipo-servicio.service';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { configReserva } from '../reserva/reserva.config';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecepcionComponent {
  columnsToDisplay =  ['habitacion', 'valor', 'fechaInicio', 'fechaFin', 'estado'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null | undefined;

  tabla = 'recepcion';
  loading: boolean = true;
  listado: any = [];
  encabezado = {
    "title": 'Recepcion',
    "subtitle": 'Listado de recepciones regitradas'
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
  listadoReserva: any;
  subscriptionCargado$!: Subscription;
  subscriptionLoading$!: Subscription;

  listadoEstados = JSON.parse(JSON.stringify(configReserva)).estados;

  constructor(private habitacionService: HabitacionService,
    private utilService: UtilService,
    private store: Store<any>,
    private estadoHabitacionService: EstadoHabitacionService,
    private tipoHabitacionService: TipoHabitacionService,
    private nivelService: NivelService,
    private tipoServicioService: TipoServicioService,
    private generalService: GeneralService) {
  }

  async ngOnInit(): Promise<void> {
    await this.cargarSelects();
    await this.cargarListadoApi();
    console.log("PRUEBA:", this.listado);
    await this.mapearListado();
    await this.mapearReserva();
    this.cargarDataSourceTable(this.listado);
  }

  async cargarSelects() {
    await this.cargarTiposHabitacion();
    await this.cargarHabitacion();
    await this.cargarReserva();
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

  public async cargarTiposHabitacion() {
    await this.cargarListadoDesdeApi('tipo-habitacion');
  }

  public async cargarHabitacion() {
    await this.cargarListadoDesdeApi('habitacion');
  }

  public async cargarReserva() {
    await this.cargarListadoDesdeApi('reserva');
  }

  async cargarListadoDesdeApi(tabla: string) {
    if (tabla == 'tipo-habitacion') {
      this.listadoTipoHabitacion = await this.tipoHabitacionService.getAllApi();
    }
    if (tabla == 'habitacion') {
      this.listadoHabitacion = await this.habitacionService.getAllApi();
    }
    if (tabla == 'reserva') {
      this.listadoReserva = await this.generalService.getAllApi(tabla);
    }
  }


  mapServicios(id: any) {
    let x = JSON.parse(JSON.stringify(this.listadoTipoServicio));
    let items = '';
    for (let arr of id) {
      for (let y of x) {
        if (y.id == arr) {
          items += `<span><strong>[</strong>${y.nombre}<strong>]</strong>, </span>`;
        }
      }
    }

    return items.substring(0, items.length - 2);
  }

  mapearListado() {
    let listadoAux = JSON.parse(JSON.stringify(this.listado));
    for (let x of listadoAux) {
      x.habitacion = this.utilService.getObjeto(x.habitacion, this.listadoHabitacion);
      let habitacion = JSON.parse(JSON.stringify(x.habitacion));
      habitacion.tipoHabitacion = this.utilService.getObjeto(x.habitacion.tipoHabitacion, this.listadoTipoHabitacion);
      x.habitacion = habitacion;
      x.estado = this.listadoEstados.filter((data: any) => {
        return data.id == x.estado
      })[0];
    }
    this.listado = listadoAux;
  }

  mapearReserva() {
    let listadoAux = JSON.parse(JSON.stringify(this.listadoReserva));
    for (let x of listadoAux) {
      x.habitacion = this.utilService.getObjeto(x.habitacion, this.listadoHabitacion);
      let habitacion = JSON.parse(JSON.stringify(x.habitacion));
      habitacion.tipoHabitacion = this.utilService.getObjeto(x.habitacion.tipoHabitacion, this.listadoTipoHabitacion);
      x.habitacion = habitacion;
      x.estado = this.listadoEstados.filter((data: any) => {
        return data.id == x.estado
      })[0];
    }
    this.listadoReserva = listadoAux;
    console.log("MAPEAR RESERVAS:", listadoAux);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];

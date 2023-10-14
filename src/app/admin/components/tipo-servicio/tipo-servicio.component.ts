import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TipoServicioService } from 'src/app/core/services/api/tipo-servicio.service';
import { selectTiposervicioList, selectTiposervicioLoading } from 'src/app/state/selectors/tiposervicio.selectors';
import { loadTiposervicio, loadedTiposervicio } from 'src/app/state/actions/tiposervicio.actions';
import { selectTipohabitacionCargado } from 'src/app/state/selectors/tipohabitacion.selectors';


@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.scss']
})
export class TipoServicioComponent implements OnInit {
  loading:boolean = true;
  listado:any = [];
  encabezado = {
    "title": 'Tipo de Habitacion',
    "subtitle": 'Listado de tipos de habitaciones regitrados'
  }
  displayedColumns: string[] = ['id', 'nombre', 'numeroPersonas', 'maximoPersonas', 'numeroCamas', 'descripcion', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();

  constructor(private tipoServicioService: TipoServicioService, 
              private utilService: UtilService,
              private store: Store<any>) {
    // this.cargarListado();
    // this.loading=true;
  }

  ngOnInit(): void{
    this.loading$ = this.store.select(selectTiposervicioLoading);
    this.store.dispatch(loadTiposervicio());
    this.cargado$ = this.store.select(selectTipohabitacionCargado);
    this.cargado$.subscribe(value => {
      if(!value){
        this.cargarListadoApi();
      }else{
        this.cargarListadoStore();
      }
    })
  }

  async cargarListadoApi(){
    await this.tipoServicioService.getAll().subscribe((res:any) => {
      console.log(res);
      this.listado = JSON.parse(res.body).listado;
      this.store.dispatch(
        loadedTiposervicio(
          {tipoServicios: this.listado}
        )
      );
      this.dataSource = new MatTableDataSource(this.listado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.loading=false;
    });
  }

  async cargarListadoStore(){
    await this.store.select(selectTiposervicioList).subscribe(res => {
      console.log(res);
      this.listado = res;
      this.store.dispatch(
        loadedTiposervicio(
          {tipoServicios: this.listado}
        )
      );
      this.dataSource = new MatTableDataSource(this.listado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.loading=false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:string){
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
        this.tipoServicioService.delete(id).subscribe((res) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido borrado.',
            'success'
          ).then(() =>{
            this.utilService.reloadCurrentRoute();
          })
        });
      }
    })
  }
}

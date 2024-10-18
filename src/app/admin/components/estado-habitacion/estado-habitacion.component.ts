import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { Store } from '@ngrx/store';
import { changeEstadohabitacion, loadEstadohabitacion, loadedEstadohabitacion } from 'src/app/state/actions/estadohabitacion.actions';
import { selectEstadohabitacionCargado, selectEstadohabitacionList, selectEstadohabitacionLoading } from 'src/app/state/selectors/estadohabitacion.selectors';
import { Observable } from 'rxjs';
import { GeneralPhpService } from 'src/app/core/services/api/general-php.service';


@Component({
  selector: 'app-estado-habitacion',
  templateUrl: './estado-habitacion.component.html',
  styleUrls: ['./estado-habitacion.component.scss']
})
export class EstadoHabitacionComponent implements OnInit {
  loading:boolean = true;
  listado:any = [];
  encabezado = {
    "title": 'Estados de Habitacion',
    "subtitle": 'Listado de estados de habitaciones regitrados'
  }
  displayedColumns: string[] = ['nombre', 'descripcion', 'color', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();
  tabla = 'estadohabitacion'

  constructor(private generalPhpService: GeneralPhpService, 
              private utilService: UtilService, 
              private store: Store<any>) {
    //this.cargarListado();
    //this.loading=true;
    
  }

  async ngOnInit(): Promise<void>{
    await this.cargarListadoApi();
  }

  cargarListado(){
    this.loading$ = this.store.select(selectEstadohabitacionLoading);
    this.store.dispatch(loadEstadohabitacion());
    this.cargado$ = this.store.select(selectEstadohabitacionCargado);
    this.cargado$.subscribe(value => {
      if(!value){
        console.log("ESTADO HAB CARGADO DE API");
        this.cargarListadoApi();
      }else{
        console.log("ESTADO HAB CARGADO DE STORE");
        this.cargarListadoStore();
      }
    })
  }

  async cargarListadoApi(){
    this.listado = (await this.generalPhpService.readAll(this.tabla)).subscribe((val:any) => {
      console.log("VAL: ", val);
      this.listado = val.data;

      this.cargarDataSourceTable(this.listado);
    });  
  }

  cargarDataSourceTable(listado:any){
    this.dataSource = new MatTableDataSource(this.listado);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async cargarListadoStore(){
    // this.listado = await this.estadoHabitacionService.getAllStore();
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
        this.generalPhpService.delete(this.tabla,id).subscribe((res:any) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido borrado.',
            'success'
          ).then(() =>{
            this.store.dispatch(changeEstadohabitacion(
              {cargado: false}
            ));
            this.utilService.reloadCurrentRoute();
          })
        });
      }
    })

  }
}

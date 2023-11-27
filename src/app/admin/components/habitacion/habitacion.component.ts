import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HabitacionService } from 'src/app/core/services/api/habitacion.service';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectHabitacionCargado, selectHabitacionList, selectHabitacionLoading } from 'src/app/state/selectors/habitacion.selectors';
import { changeHabitacion, loadHabitacion, loadedHabitacion } from 'src/app/state/actions/habitacion.actions';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { TipoHabitacionService } from 'src/app/core/services/api/tipo-habitacion.service';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { TipoServicioService } from 'src/app/core/services/api/tipo-servicio.service';
import { selectEstadohabitacionCargado, selectEstadohabitacionList } from 'src/app/state/selectors/estadohabitacion.selectors';
import { loadedEstadohabitacion } from 'src/app/state/actions/estadohabitacion.actions';
import { selectTipohabitacionCargado, selectTipohabitacionList } from 'src/app/state/selectors/tipohabitacion.selectors';
import { loadedTipohabitacion } from 'src/app/state/actions/tipohabitacion.actions';
import { selectTiposervicioCargado, selectTiposervicioList } from 'src/app/state/selectors/tiposervicio.selectors';
import { loadedTiposervicio } from 'src/app/state/actions/tiposervicio.actions';
import { selectNivelCargado, selectNivelList } from 'src/app/state/selectors/nivel.selectors';
import { loadedNivel } from 'src/app/state/actions/nivel.actions';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss']
})
export class HabitacionComponent implements OnInit, OnDestroy{
  loading:boolean = true;
  listado:any = [];
  encabezado = {
    "title": 'Habitacion',
    "subtitle": 'Listado de habitaciones regitradas'
  }
  // displayedColumns: string[] = ['id', 'nombre', 'valor', 'descripcion', 'tipoHabitacion', 'nivel', 'servicios', 'estadoHabitacion', 'accion'];
  displayedColumns: string[] = ['nombre', 'valor', 'tipoHabitacion', 'nivel', 'servicios', 'estadoHabitacion', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();

  cargadoEstadoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoEstadoHabitacion:any;
  cargadoTipoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoTipoHabitacion:any;
  cargadoNivel$: Observable<boolean> = new Observable<boolean>;
  listadoNivel:any;
  cargadoTipoServicio$: Observable<boolean> = new Observable<boolean>;
  listadoTipoServicio:any;
  subscriptionCargado$!: Subscription;
  subscriptionLoading$!: Subscription;

  constructor(private habitacionService: HabitacionService, 
              private utilService: UtilService,
              private store: Store<any>,
              private estadoHabitacionService: EstadoHabitacionService,
              private tipoHabitacionService: TipoHabitacionService,
              private nivelService: NivelService,
              private tipoServicioService: TipoServicioService) {
    
    
  }

  async ngOnInit(): Promise<void>{
    await this.cargarSelects();
    await this.cargarListadoApi();
    await this.mapearListado();
    this.cargarDataSourceTable(this.listado);
  }

  async cargarSelects(){
    await this.cargarEstadosHabitacion();
    await this.cargarTiposHabitacion();
    await this.cargarNiveles();
    await this.cargarTiposServicio();
  }

  cargarListado(){
    this.loading$ = this.store.select(selectHabitacionLoading);
    this.store.dispatch(loadHabitacion());
    this.cargado$ = this.store.select(selectHabitacionCargado);
    this.subscriptionCargado$ = this.cargado$.subscribe(value => {
      if(!value){
        console.log("CARGAR HABITACION API");
        this.cargarListadoApi();
      }else{
        console.log("CARGAR HABITACION STORE");
        this.cargarListadoStore();
      }
    })
  }

  ngOnDestroy(): void {
  }

  async cargarListadoApi(){
    this.listado = await this.habitacionService.getAllApi();
    // this.cargarDataSourceTable(this.listado);
  }

  async cargarListadoStore(){
    (await this.habitacionService.getAllStore()).subscribe(res =>{
      this.listado = res;
      this.cargarDataSourceTable(this.listado);
    });   
  }

  cargarDataSourceTable(listado:any){
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
        this.habitacionService.delete(id).subscribe((res) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido borrado.',
            'success'
          ).then(() =>{
            this.store.dispatch(changeHabitacion(
              {cargado: false}
            ));
            this.utilService.reloadCurrentRoute();
          })
        });
      }
    })
  }

  public async cargarEstadosHabitacion(){
    await this.cargarListadoDesdeApi('estado-habitacion');
    // this.cargadoEstadoHabitacion$ = this.store.select(selectEstadohabitacionCargado);
    // this.cargadoEstadoHabitacion$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('estado-habitacion');
    //     }else{
    //       //await this.cargarListadoDesdeStore('estado-habitacion');
    //       await this.cargarListadoDesdeApi('estado-habitacion');
    //     }
    // })
  }

  public async cargarTiposHabitacion(){
    await this.cargarListadoDesdeApi('tipo-habitacion');
    // this.cargadoTipoHabitacion$ = this.store.select(selectTipohabitacionCargado);
    // this.cargadoTipoHabitacion$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('tipo-habitacion');
    //     }else{
    //       //await this.cargarListadoDesdeStore('tipo-habitacion');
    //       await this.cargarListadoDesdeApi('tipo-habitacion');
    //     }
    // })
  }

  public async cargarTiposServicio(){
    await this.cargarListadoDesdeApi('tipo-servicio');
    // this.cargadoTipoServicio$ = this.store.select(selectTiposervicioCargado);
    // this.cargadoTipoServicio$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('tipo-servicio');
    //     }else{
    //       // await this.cargarListadoDesdeStore('tipo-servicio');
    //       await this.cargarListadoDesdeApi('tipo-servicio');
    //     }
    // })
  }

  public async cargarNiveles(){
    await this.cargarListadoDesdeApi('nivel');
    // this.cargadoNivel$ = this.store.select(selectNivelCargado);
    // this.cargadoNivel$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('nivel');
    //     }else{
    //       // await this.cargarListadoDesdeStore('nivel');
    //       await this.cargarListadoDesdeApi('nivel');
    //     }
    // })
  }


  async cargarListadoDesdeApi(tabla:string){
    if(tabla=='estado-habitacion'){
      this.listadoEstadoHabitacion = await this.estadoHabitacionService.getAllApi();
    }
    if(tabla=='tipo-habitacion'){
      this.listadoTipoHabitacion = await this.tipoHabitacionService.getAllApi();
    }
    if(tabla=='tipo-servicio'){
      this.listadoTipoServicio = await this.tipoServicioService.getAllApi();
    }
    if(tabla=='nivel'){
      this.listadoNivel = await this.nivelService.getAllApi();
    }
  }

  async cargarListadoDesdeStore(tabla:string){
    if(tabla == 'estado-habitacion'){
      (await this.listadoEstadoHabitacion.getAllStore()).subscribe((res: any) =>{
        this.listadoEstadoHabitacion = res;
      });
      //this.listadoEstadoHabitacion = await this.estadoHabitacionService.getAllStore();
    }
    if(tabla=='tipo-habitacion'){
      (await this.listadoTipoHabitacion.getAllStore()).subscribe((res: any) =>{
        this.listadoTipoHabitacion = res;
      });
      //this.listadoTipoHabitacion = await this.tipoHabitacionService.getAllStore();
    }
    if(tabla=='tipo-servicio'){
      (await this.listadoTipoServicio.getAllStore()).subscribe((res: any) =>{
        this.listadoTipoServicio = res;
      });
      //this.listadoTipoServicio = await this.tipoHabitacionService.getAllStore();
    }
    if(tabla=='nivel'){
      (await this.listadoNivel.getAllStore()).subscribe((res: any) =>{
        this.listadoNivel = res;
      });
      //this.listadoHabitacion = await this.habitacionService.getAllStore();
    }
  }

  mapServicios(id: any){
    let x = JSON.parse(JSON.stringify(this.listadoTipoServicio));
    let items = '';
    for(let arr of id){
      for(let y of x){
        if(y.id == arr){
          items+=`<span><strong>[</strong>${y.nombre}<strong>]</strong>, </span>`;
        }
      }
    }
    
    return items.substring(0, items.length-2);
  }

  mapearListado(){
    let listadoAux = JSON.parse(JSON.stringify(this.listado));
    for(let x of listadoAux){
      x.tipoHabitacion = this.utilService.getObjeto(x.tipoHabitacion, this.listadoTipoHabitacion);
      x.estadoHabitacion = this.utilService.getObjeto(x.estadoHabitacion, this.listadoEstadoHabitacion);
      x.servicios = this.utilService.getObjetos([...x.servicios], this.listadoTipoServicio);
    }
    this.listado = listadoAux;
    console.log(this.listado);
  }
}

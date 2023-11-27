import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { NivelFormComponent } from './form/nivel-form/nivel-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNivelCargado, selectNivelList, selectNivelLoading } from 'src/app/state/selectors/nivel.selectors';
import { loadNivel, loadedNivel, changeNivel } from 'src/app/state/actions/nivel.actions';
import { KeyValue } from '@angular/common';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { TipoHabitacionService } from 'src/app/core/services/api/tipo-habitacion.service';
import { HabitacionService } from 'src/app/core/services/api/habitacion.service';
import { TipoServicioService } from 'src/app/core/services/api/tipo-servicio.service';
import { selectHabitacionCargado, selectHabitacionList } from 'src/app/state/selectors/habitacion.selectors';
import { loadedHabitacion } from 'src/app/state/actions/habitacion.actions';
import { selectTiposervicioCargado, selectTiposervicioList } from 'src/app/state/selectors/tiposervicio.selectors';
import { loadedTipohabitacion } from 'src/app/state/actions/tipohabitacion.actions';
import { selectTipohabitacionCargado, selectTipohabitacionList } from 'src/app/state/selectors/tipohabitacion.selectors';
import { loadedEstadohabitacion } from 'src/app/state/actions/estadohabitacion.actions';
import { selectEstadohabitacionCargado, selectEstadohabitacionList } from 'src/app/state/selectors/estadohabitacion.selectors';
import { loadedTiposervicio } from 'src/app/state/actions/tiposervicio.actions';


@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.scss']
})
export class NivelComponent implements OnInit{
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  loading:boolean = false;
  listado:any = [];
  encabezado = {
    "title": 'Niveles',
    "subtitle": 'Listado de Niveles(Pisos) regitrados'
  }
  
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();

  cargadoEstadoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoEstadoHabitacion:any;
  cargadoTipoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoTipoHabitacion:any;
  cargadoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoHabitacion:any;
  cargadoTipoServicio$: Observable<boolean> = new Observable<boolean>;
  listadoTipoServicio:any;

  constructor(private nivelService: NivelService, 
              private utilService: UtilService, 
              public dialog: MatDialog,
              private store: Store<any>,
              private estadoHabitacionService: EstadoHabitacionService,
              private tipoHabitacionService: TipoHabitacionService,
              private habitacionService: HabitacionService,
              private tipoServicioService: TipoServicioService) {
    //this.cargarListado();
  }

  async ngOnInit(): Promise<void>{
    await this.cargarSelects();
    await this.cargarListadoApi();
    await this.mapearListado();
  }

  async cargarSelects(){
    await this.cargarEstadosHabitacion();
    await this.cargarTiposHabitacion();
    await this.cargarHabitaciones();
    await this.cargarTiposServicio();
  }

  async cargarListado(){
    this.loading$ = this.store.select(selectNivelLoading);
    this.store.dispatch(loadNivel());
    this.cargado$ = await this.store.select(selectNivelCargado);
    await this.cargado$.subscribe(async value => {
      if(!value){
        console.log("NIVEL CARGADO DE API");
        await this.cargarListadoApi();
      }else{
        console.log("NIVEL CARGADO DE STORE");
        await this.cargarListadoStore();
      }
    })
  }

  async cargarListadoApi(){
    this.listado = await this.nivelService.getAllApi();
  }

  async cargarListadoStore(){
    (await this.nivelService.getAllStore()).subscribe(res =>{
      this.listado = res;
    });
  }

  abrirDialog(action:string, campos:any){
    let data = { action: action, campos: {id:'0', descripcion: '', posicion:''} };
    if(action == 'editar'){
      data = { action: action, 
               campos: {id: campos.id, descripcion: campos.descripcion, 
               posicion: campos.posicion} }
    }
    const dialogRef = this.dialog.open(NivelFormComponent, {
      width: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
        this.nivelService.delete(id).subscribe((res) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido borrado.',
            'success'
          ).then(() =>{
            this.store.dispatch(changeNivel(
              {cargado: false}
            ));
            this.utilService.reloadCurrentRoute();
          })
        });
      }
    })
  }

  indexOrderAsc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
    const a = akv.value.posicion;
    const b = bkv.value.posicion;

    return a > b ? 1 : (b > a ? -1 : 0);
  };

  indexOrderDesc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
    const a = akv.value.posicion;
    const b = bkv.value.posicion;

    return a < b ? 1 : (b < a ? -1 : 0);
  };

  public async cargarEstadosHabitacion(){
    await this.cargarListadoDesdeApi('estado-habitacion');
    // this.cargadoEstadoHabitacion$ = this.store.select(selectEstadohabitacionCargado);
    // this.cargadoEstadoHabitacion$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('estado-habitacion');
    //     }else{
    //       await this.cargarListadoDesdeStore('estado-habitacion');
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
    //       await this.cargarListadoDesdeStore('tipo-habitacion');
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
    //       await this.cargarListadoDesdeStore('tipo-servicio');
    //     }
    // })
  }

  public async cargarHabitaciones(){
    await this.cargarListadoDesdeApi('habitacion');
    // this.cargadoHabitacion$ = this.store.select(selectHabitacionCargado);
    // this.cargadoHabitacion$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('habitacion');
    //     }else{
    //       await this.cargarListadoDesdeStore('habitacion');
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
    if(tabla=='habitacion'){
      this.listadoHabitacion = await this.habitacionService.getAllApi();
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
    if(tabla=='habitacion'){
      (await this.listadoHabitacion.getAllStore()).subscribe((res: any) =>{
        this.listadoHabitacion = res;
      });
      //this.listadoHabitacion = await this.habitacionService.getAllStore();
    }
  }

  mapearListado(){
    this.mapearHabitaciones();
    let listadoAux = JSON.parse(JSON.stringify(this.listado));
    for(let x of listadoAux){
      x.habitaciones = this.listadoHabitacion.filter((v:any)=>{
        console.log("COMPARAR: ", v.nivel, x.id);
        return v.nivel == x.id;
      });
    }
    this.listado = listadoAux;
    console.log(this.listado, this.listadoHabitacion);
  }

  mapearHabitaciones(){
    let listadoAux = JSON.parse(JSON.stringify(this.listadoHabitacion));
    for(let x of listadoAux){
      x.tipoHabitacion = this.utilService.getObjeto(x.tipoHabitacion, this.listadoTipoHabitacion);
      x.estadoHabitacion = this.utilService.getObjeto(x.estadoHabitacion, this.listadoEstadoHabitacion);
      x.servicios = this.utilService.getObjetos([...x.servicios], this.listadoTipoServicio);
    }
    this.listadoHabitacion=listadoAux;
  }

}

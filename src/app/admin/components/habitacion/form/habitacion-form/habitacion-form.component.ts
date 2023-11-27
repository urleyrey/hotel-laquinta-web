import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { HabitacionService } from 'src/app/core/services/api/habitacion.service';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { TipoHabitacionService } from 'src/app/core/services/api/tipo-habitacion.service';
import { TipoServicioService } from 'src/app/core/services/api/tipo-servicio.service';
import { UtilService } from 'src/app/core/services/util.service';
import { loadedEstadohabitacion } from 'src/app/state/actions/estadohabitacion.actions';
import { changeHabitacion } from 'src/app/state/actions/habitacion.actions';
import { loadedNivel } from 'src/app/state/actions/nivel.actions';
import { loadedTipohabitacion } from 'src/app/state/actions/tipohabitacion.actions';
import { loadedTiposervicio } from 'src/app/state/actions/tiposervicio.actions';
import { selectEstadohabitacionCargado, selectEstadohabitacionList } from 'src/app/state/selectors/estadohabitacion.selectors';
import { selectNivelCargado, selectNivelList } from 'src/app/state/selectors/nivel.selectors';
import { selectTipohabitacionCargado, selectTipohabitacionList } from 'src/app/state/selectors/tipohabitacion.selectors';
import { selectTiposervicioCargado, selectTiposervicioList } from 'src/app/state/selectors/tiposervicio.selectors';

@Component({
  selector: 'app-habitacion-form',
  templateUrl: './habitacion-form.component.html',
  styleUrls: ['./habitacion-form.component.scss']
})
export class HabitacionFormComponent {
  loading:boolean = false;
  id:string='0';
  data:any;
  updateExpression:string = '';
  updateValues:any = {};
  camposEditados:string = '';
  action:string = 'crear';
  duration: number = 0;
  durationLimit=1000;
  encabezado = {
    "title": 'Habitacion',
    "subtitle": 'Listado de habitaciones regitradas'
  }
  myForm!: FormGroup;
  cargadoEstadoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoEstadoHabitacion:any;
  cargadoTipoHabitacion$: Observable<boolean> = new Observable<boolean>;
  listadoTipoHabitacion:any;
  cargadoNivel$: Observable<boolean> = new Observable<boolean>;
  listadoNivel:any;
  cargadoTipoServicio$: Observable<boolean> = new Observable<boolean>;
  listadoTipoServicio:any;
  
  constructor(private router: Router,  route: ActivatedRoute,
    private habitacionService: HabitacionService, 
    private fb: FormBuilder, private utilService: UtilService,
    private store: Store<any>,
    private estadoHabitacionService: EstadoHabitacionService,
    private tipoHabitacionService: TipoHabitacionService,
    private nivelService: NivelService,
    private tipoServicioService: TipoServicioService){
      this.cargarEstadosHabitacion();
      this.cargarTiposHabitacion();
      this.cargarNiveles();
      this.cargarTiposServicio();

      this.myForm = fb.group({
        nombre: ['', [Validators.required]],
        valor: [0, [Validators.required]],
        descripcion: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        estadoHabitacion: ['', [Validators.required]],
        tipoHabitacion: ['', [Validators.required]],
        servicios: ['', [Validators.required]],
      });

      this.id=route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';
      console.log("ID: ",this.id);
      
      if(this.action == 'editar'){
        this.loading = true;
        this.habitacionService.get(this.id).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          console.log(this.data);
          this.myForm.controls['nombre'].setValue(this.data.nombre);
          this.myForm.controls['valor'].setValue(this.data.valor);
          this.myForm.controls['descripcion'].setValue(this.data.descripcion);
          this.myForm.controls['nivel'].setValue(this.data.nivel);
          this.myForm.controls['estadoHabitacion'].setValue(this.data.estadoHabitacion);
          this.myForm.controls['tipoHabitacion'].setValue(this.data.tipoHabitacion);
          this.myForm.controls['servicios'].setValue(this.data.servicios);
          this.loading=false;
        });
      }
      
  }

  onSubmit(form: any) {
    if(this.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.habitacionService.post(form.value).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          this.store.dispatch(changeHabitacion(
            {cargado: false}
          ));
          this.router.navigate(['/admin','habitacion']);
        });
      });
    }
  }

  putFields(form: any){
    if(form.value.nombre != this.data.nombre){
      this.updateExpression+="nombre=:nombre,";
      this.updateValues[':nombre']=form.value.nombre;
      this.camposEditados+=" NOMBRE,";
    }
    if(form.value.estadoHabitacion != this.data.estadoHabitacion){
      this.updateExpression+="estadoHabitacion=:estadoHabitacion,";
      this.updateValues[':estadoHabitacion']=form.value.estadoHabitacion+"";
      this.camposEditados+=" ESTADO HABITACION,";
    }
    if(form.value.tipoHabitacion != this.data.tipoHabitacion){
      this.updateExpression+="tipoHabitacion=:tipoHabitacion,";
      this.updateValues[':tipoHabitacion']=form.value.tipoHabitacion;
      this.camposEditados+=" TIPO HABITACION,";
    }
    if(form.value.servicios != this.data.servicios){
      this.updateExpression+="servicios=:servicios,";
      this.updateValues[':servicios']=form.value.servicios;
      this.camposEditados+=" SERVICIOS,";
    }
    if(form.value.nivel != this.data.nivel){
      this.updateExpression+="nivel=:nivel,";
      this.updateValues[':nivel']=form.value.nivel;
      this.camposEditados+=" NIVEL,";
    }
    if(form.value.descripcion != this.data.descripcion){
      this.updateExpression+="descripcion=:descripcion,";
      this.updateValues[':descripcion']=form.value.descripcion;
      this.camposEditados+=" DESCRIPCION,";
    }
    if(form.value.valor != this.data.valor){
      this.updateExpression+="valor=:valor,";
      this.updateValues[':valor']=form.value.valor;
      this.camposEditados+=" VALOR,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.habitacionService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.store.dispatch(changeHabitacion(
          {cargado: false}
        ));
        this.router.navigate(['/admin','habitacion']);
      });
    });
  }


  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  goBack() {
    this.router.navigate(['admin/habitacion']);
  }

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

  public async cargarNiveles(){
    await this.cargarListadoDesdeApi('nivel');
    // this.cargadoNivel$ = this.store.select(selectNivelCargado);
    // this.cargadoNivel$.subscribe(async value => {
    //     if(!value){
    //       await this.cargarListadoDesdeApi('nivel');
    //     }else{
    //       await this.cargarListadoDesdeStore('nivel');
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
      this.listadoEstadoHabitacion = await this.estadoHabitacionService.getAllStore();
    }
    if(tabla=='tipo-habitacion'){
      this.listadoTipoHabitacion = await this.tipoHabitacionService.getAllStore();
    }
    if(tabla=='tipo-servicio'){
      this.listadoTipoServicio = await this.tipoHabitacionService.getAllStore();
    }
    if(tabla=='nivel'){
      this.listadoNivel = await this.nivelService.getAllStore();
    }
  }


}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
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
import { configReserva } from '../reserva.config'
import { ReservaService } from 'src/app/core/services/api/reserva.service';
import { GeneralService } from 'src/app/core/services/api/general.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReservaFormComponent implements OnInit {

  @ViewChild('picker', { static: true }) picker: any;
  @ViewChild('pickerFin', { static: true }) pickerFin: any;

  private tabla="reserva";
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;
  public minDate: Date | undefined;
  public maxDate: Date | undefined;
  public stepHour = 1;
  public stepMinute = 5;
  public stepSecond = 1;
  public disableMinute = false;
  public hideTime = false;
  public defaultTime = [new Date().getHours(), 0 , 0] 

  public dateControl = new FormControl(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25]; 


  listadoEstados = JSON.parse(JSON.stringify(configReserva)).estados;
  loading:boolean = false;
  id:string='0';
  to='';
  from='';
  data:any;
  updateExpression:string = '';
  updateValues:any = {};
  camposEditados:string = '';
  action:string = 'crear';
  duration: number = 0;
  durationLimit=1000;
  encabezado = {
    "title": 'Reserva',
    "subtitle": 'Información de Reserva'
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
  listadoHabitacion:any;
  listadoCliente:any;
  
  constructor(private router: Router,  private route: ActivatedRoute,
    private habitacionService: HabitacionService, 
    private fb: FormBuilder, private utilService: UtilService,
    private store: Store<any>,
    private estadoHabitacionService: EstadoHabitacionService,
    private tipoHabitacionService: TipoHabitacionService,
    private nivelService: NivelService,
    private reservaService: ReservaService,
    private generalService: GeneralService){
      
      this.myForm = fb.group({
        numeroPersonas: [0, [Validators.required]],
        valor: [0, [Validators.required]],
        habitacion: ['', [Validators.required]],
        observaciones: ['', [Validators.required]],
        motivoViaje: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaFin: ['', [Validators.required]],
        cliente: ['', [Validators.required]],
      });
      
  }

  async ngOnInit(): Promise<void> {
    this.id=this.route.snapshot.paramMap.get('id')!;
    const range = this.route.snapshot.paramMap.get('range')!;
    this.to=range.split('to')[1];
    this.from=range.split('to')[0];

      this.id=='0'?this.action='crear':this.action='editar';
      console.log("ID: ",this.id, this.from, this.to);
      
      if(this.action == 'editar'){
        this.loading = true;
        this.generalService.get(this.id, this.tabla).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          console.log(this.data);
          this.myForm.controls['numeroPersonas'].setValue(this.data.numeroPersonas);
          this.myForm.controls['valor'].setValue(this.data.valor);
          this.myForm.controls['habitacion'].setValue(this.data.habitacion);
          this.myForm.controls['motivoViaje'].setValue(this.data.motivoViaje);
          this.myForm.controls['observaciones'].setValue(this.data.observaciones);
          this.myForm.controls['estado'].setValue(this.data.estado);
          this.myForm.controls['fechaInicio'].setValue(this.data.fechaInicio);
          this.myForm.controls['fechaFin'].setValue(this.data.fechaFin);
          this.myForm.controls['cliente'].setValue(this.data.cliente);
          this.loading=false;
        });
      }else{
        if(range != 'to'){
          this.myForm.controls['fechaInicio'].setValue(new Date(this.from+' 12:00:00'));
          this.myForm.controls['fechaFin'].setValue(new Date(this.to+' 12:00:00'));
        }
      }
      await this.cargarSelects();
      await this.cargarHabitaciones();
      await this.mapearHabitaciones();
  }

  async cargarSelects(){
    await this.cargarEstadosHabitacion();
    await this.cargarTiposHabitacion();
    await this.cargarClientes();
  }

  onSubmit(form: any) {
    if(this.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.generalService.post(form.value, this.tabla).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          
          this.router.navigate(['/admin','reserva']);
        });
      });
    }
  }

  putFields(form: any){
    if(form.value.cliente != this.data.cliente){
      this.updateExpression+="cliente=:cliente,";
      this.updateValues[':cliente']=form.value.cliente;
      this.camposEditados+=" CLIENTE,";
    }
    if(form.value.numeroPersonas != this.data.numeroPersonas){
      this.updateExpression+="numeroPersonas=:numeroPersonas,";
      this.updateValues[':numeroPersonas']=form.value.numeroPersonas;
      this.camposEditados+=" NUMERO DE PERSONAS,";
    }
    if(form.value.habitacion != this.data.habitacion){
      this.updateExpression+="habitacion=:habitacion,";
      this.updateValues[':estadoHabitacion']=form.value.habitacion+"";
      this.camposEditados+=" HABITACION,";
    }
    if(form.value.valor != this.data.valor){
      this.updateExpression+="valor=:valor,";
      this.updateValues[':valor']=form.value.valor;
      this.camposEditados+=" VALOR,";
    }
    if(form.value.observaciones != this.data.observaciones){
      this.updateExpression+="observaciones=:observaciones,";
      this.updateValues[':observaciones']=form.value.observaciones;
      this.camposEditados+=" OBSERVACIONES,";
    }
    if(form.value.motivoViaje != this.data.motivoViaje){
      this.updateExpression+="motivoViaje=:motivoViaje,";
      this.updateValues[':motivoViaje']=form.value.motivoViaje;
      this.camposEditados+=" MOTIVO DE VIAJE,";
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
    if(form.value.estado != this.data.estado){
      this.updateExpression+="estado=:estado,";
      this.updateValues[':estado']=form.value.estado;
      this.camposEditados+=" ESTADO,";
    }
    if(form.value.fechaInicio != this.data.fechaInicio){
      this.updateExpression+="fechaInicio=:fechaInicio,";
      this.updateValues[':fechaInicio']=form.value.fechaInicio;
      this.camposEditados+=" FECHA INICIO,";
    }
    if(form.value.fechaFin != this.data.fechaFin){
      this.updateExpression+="fechaFin=:fechaFin,";
      this.updateValues[':fechaFin']=form.value.fechaFin;
      this.camposEditados+=" FECHA FIN,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.generalService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues, this.tabla)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.store.dispatch(changeHabitacion(
          {cargado: false}
        ));
        this.router.navigate(['/admin','reserva']);
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
    this.router.navigate(['admin/reserva']);
  }

  async cargarHabitaciones(){
    await this.cargarListadoDesdeApi('habitacion');
  }

  public async cargarEstadosHabitacion(){
    await this.cargarListadoDesdeApi('estado-habitacion');
  }

  public async cargarTiposHabitacion(){
    await this.cargarListadoDesdeApi('tipo-habitacion');
  }

  public async cargarClientes(){
    await this.cargarListadoDesdeApi('cliente');
  }


  async cargarListadoDesdeApi(tabla:string){
    if(tabla=='estado-habitacion'){
      this.listadoEstadoHabitacion = await this.estadoHabitacionService.getAllApi();
    }
    if(tabla=='tipo-habitacion'){
      this.listadoTipoHabitacion = await this.tipoHabitacionService.getAllApi();
    }
    if(tabla=='habitacion'){
      this.listadoHabitacion = await this.habitacionService.getAllApi();
    }
    if(tabla=='cliente'){
      this.listadoCliente = await this.generalService.getAllApi('cliente');
    }
  }

  mapearHabitaciones(){
    let listadoAux = JSON.parse(JSON.stringify(this.listadoHabitacion));
    for(let x of listadoAux){
      x.tipoHabitacion = this.utilService.getObjeto(x.tipoHabitacion, this.listadoTipoHabitacion);
      x.estadoHabitacion = this.utilService.getObjeto(x.estadoHabitacion, this.listadoEstadoHabitacion);
    }
    this.listadoHabitacion=listadoAux;
    console.log("HABITACION: ", this.listadoHabitacion);
  }

  habitacionChange(habitacion:any){
    let hab = this.utilService.getObjeto(habitacion, this.listadoHabitacion);
    this.myForm.controls['valor'].setValue(hab.valor);
  }

}

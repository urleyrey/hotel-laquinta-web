import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/core/services/util.service';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { TipoMovimientoData } from 'src/app/admin/data/tipo-movimiento.data';
import { configReserva } from '../../reserva/reserva.config';
import { TipoProductoData } from 'src/app/admin/data/tipo-producto.data';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientoFormComponent {

  @ViewChild('picker', { static: true }) picker: any;

  private tabla="movimiento";
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


  listadoEstadoReservas = JSON.parse(JSON.stringify(configReserva)).estados;
  listadoTipoMovimientos = JSON.parse(JSON.stringify(TipoMovimientoData)).tipos;
  listadoTipoProductos = JSON.parse(JSON.stringify(TipoProductoData)).tipos;

  listado: any = [];
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
    "title": 'Movimiento',
    "subtitle": 'Información de Movimiento'
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
  listadoRecepcion: any;
  listadoProducto: any;
  listadoCliente: any;
  
  constructor(private router: Router,  private route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService,
    private generalService: GeneralService){
      
      this.myForm = fb.group({
        fecha:          ['', [Validators.required]],
        valor:          [0, [Validators.required]],
        observaciones:  [''],
        caja:           [''],
        producto:       ['', [Validators.required]],
        tipoMovimiento: ['', [Validators.required]],
        recepcion:      [''],
      });
      
  }

  async ngOnInit(): Promise<void> {
    this.id=this.route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';
      console.log("ID: ",this.id);
      
      if(this.action == 'editar'){
        this.loading = true;
        this.generalService.get(this.id, this.tabla).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          this.myForm.controls['fecha'].setValue(this.data.fecha);
          this.myForm.controls['valor'].setValue(this.data.valor);
          this.myForm.controls['observaciones'].setValue(this.data.observaciones);
          this.myForm.controls['caja'].setValue(this.data.caja);
          this.myForm.controls['producto'].setValue(this.data.producto);
          this.myForm.controls['tipoMovimiento'].setValue(this.data.tipoMovimiento);
          this.myForm.controls['recepcion'].setValue(this.data.recepcion);
          this.loading=false;
        });
      }
      await this.cargarSelects();
      await this.mapearRecepcion();
      // await this.cargarListadoDesdeApi(this.tabla);
      // await this.mapearListado();
      await this.mapearProductos();
  }

  async cargarSelects(){
    await this.cargarListadoDesdeApi('producto');
    await this.cargarListadoDesdeApi('habitacion');
    await this.cargarListadoDesdeApi('recepcion');
    await this.cargarListadoDesdeApi('tipo-habitacion');
    await this.cargarListadoDesdeApi('cliente');
  }

  onSubmit(form: any) {
    if(this.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.generalService.post(form.value, this.tabla).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          
          this.router.navigate(['/admin','movimiento']);
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
      this.updateValues[':servicios']=form.value.observaciones;
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
    if(form.value.adicional != this.data.adicional){
      this.updateExpression+="adicional=:adicional,";
      this.updateValues[':adicional']=form.value.adicional;
      this.camposEditados+=" VALOR ADICIONAL,";
    }
    if(form.value.descuento != this.data.descuento){
      this.updateExpression+="descuento=:descuento,";
      this.updateValues[':descuento']=form.value.descuento;
      this.camposEditados+=" DESCUENTO,";
    }
    if(form.value.reserva != this.data.reserva){
      this.updateExpression+="reserva=:reserva,";
      this.updateValues[':reserva']=form.value.reserva;
      this.camposEditados+=" RESERVA,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.generalService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues, this.tabla)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.router.navigate(['/admin','movimiento']);
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
    this.router.navigate(['admin/movimiento']);
  }

  async cargarListadoDesdeApi(tabla:string){
    if(tabla=='movimiento'){
      this.listado = await this.generalService.getAllApi(tabla);
    }
    if(tabla=='producto'){
      this.listadoProducto = await this.generalService.getAllApi(tabla);
    }
    if(tabla=='tipo-habitacion'){
      this.listadoTipoHabitacion = await this.generalService.getAllApi(tabla);
    }
    if(tabla=='habitacion'){
      this.listadoHabitacion = await this.generalService.getAllApi(tabla);
    }
    if (tabla == 'recepcion') {
      this.listadoRecepcion = await this.generalService.getAllApi(tabla);
    }
    if (tabla == 'cliente') {
      this.listadoCliente = await this.generalService.getAllApi(tabla);
    }
  }

  

  mapearListado() {
    let listadoAux = JSON.parse(JSON.stringify(this.listado));
    for (let x of listadoAux) {
      let producto = this.utilService.getObjeto(x.producto, this.listadoProducto);
      producto.tipoProducto = this.utilService.getObjeto(x.producto, this.listadoTipoProductos);
      x.producto = producto;
      
      let recepcion = JSON.parse(JSON.stringify(x.recepcion));
      recepcion.habitacion = this.utilService.getObjeto(x.recepcion.habitacion, this.listadoHabitacion);
      x.recepcion = recepcion;

      x.tipoMovimiento = this.listadoTipoMovimientos.filter((data: any) => {
        return data.id == x.tipoMovimiento
      })[0];
    }
    this.listado = listadoAux;
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
    console.log("MAPEAR RECEPCION:", listadoAux);
  }

  mapearProductos() {
    let listadoAux = JSON.parse(JSON.stringify(this.listadoProducto));
    for (let x of listadoAux) {
      x.tipoProducto = this.listadoTipoProductos.filter((data: any) => {
        return data.id == x.tipoProducto
      })[0];
    }
    this.listadoProducto = listadoAux;
  }

  productoChange(producto:any){
    let prod = this.utilService.getObjeto(producto, this.listadoProducto);
    this.myForm.controls['valor'].setValue(prod.valor);
  }
}

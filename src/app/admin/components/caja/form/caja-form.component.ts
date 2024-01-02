import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/core/services/util.service';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { EstadoCajaData } from 'src/app/admin/data/estado-caja.data';

@Component({
  selector: 'app-caja-form',
  templateUrl: './caja-form.component.html',
  styleUrls: ['./caja-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CajaFormComponent implements OnInit {
  @ViewChild('picker', { static: true }) picker: any;
  @ViewChild('pickerFin', { static: true }) pickerFin: any;

  private tabla="caja";
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
  public hideTime = true;
  public defaultTime = [new Date().getHours(), 0 , 0] 

  public dateControl = new FormControl(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25]; 


  listadoEstados = JSON.parse(JSON.stringify(EstadoCajaData)).estados;

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
    "title": 'Caja',
    "subtitle": 'Información de Caja Diaria'
  }
  myForm!: FormGroup;
  
  constructor(private router: Router,  private route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService,
    private generalService: GeneralService){
      
      this.myForm = fb.group({
        observaciones: ['', [Validators.required]],
        valorInicial: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaCierre: ['', [Validators.required]],
        ingresos: ['', [Validators.required]],
        egresos: ['', [Validators.required]],
        estado: ['', [Validators.required]],
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
          console.log(this.data);
          this.myForm.controls['observaciones'].setValue(this.data.observaciones);
          this.myForm.controls['valorInicial'].setValue(this.data.valorInicial);
          this.myForm.controls['fechaInicio'].setValue(this.data.fechaInicio);
          this.myForm.controls['fechaCierre'].setValue(this.data.fechaCierre);
          this.myForm.controls['ingresos'].setValue(this.data.ingresos);
          this.myForm.controls['egresos'].setValue(this.data.egresos);
          this.myForm.controls['estado'].setValue(this.data.estado);
          this.loading=false;
        });
      }
  }

  onSubmit(form: any) {
    if(this.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.generalService.post(form.value, this.tabla).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          
          this.router.navigate(['/admin','cliente']);
        });
      });
    }
  }

  putFields(form: any){
    if(form.value.observaciones != this.data.observaciones){
      this.updateExpression+="observaciones=:observaciones,";
      this.updateValues[':observaciones']=form.value.observaciones;
      this.camposEditados+=" OBSERVACIONES,";
    }
    if(form.value.valorInicial != this.data.valorInicial){
      this.updateExpression+="valorInicial=:valorInicial,";
      this.updateValues[':valorInicial']=form.value.valorInicial+"";
      this.camposEditados+=" VALOR INICIAL,";
    }
    if(form.value.fechaInicio != this.data.fechaInicio){
      this.updateExpression+="fechaInicio=:fechaInicio,";
      this.updateValues[':fechaInicio']=form.value.fechaInicio;
      this.camposEditados+=" FECHA INICIO,";
    }
    if(form.value.fechaCierre != this.data.fechaCierre){
      this.updateExpression+="fechaCierre=:fechaCierre,";
      this.updateValues[':fechaCierre']=form.value.fechaCierre;
      this.camposEditados+=" FECHA CIERRE,";
    }
    if(form.value.ingresos != this.data.ingresos){
      this.updateExpression+="ingresos=:ingresos,";
      this.updateValues[':ingresos']=form.value.ingresos;
      this.camposEditados+=" INGRESOS,";
    }
    if(form.value.egresos != this.data.egresos){
      this.updateExpression+="egresos=:egresos,";
      this.updateValues[':egresos']=form.value.egresos;
      this.camposEditados+=" EGRESOS,";
    }
    if(form.value.estado != this.data.estado){
      this.updateExpression+="estado=:estado,";
      this.updateValues[':estado']=form.value.estado;
      this.camposEditados+=" ESTADO,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.generalService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues, this.tabla)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.router.navigate(['/admin','caja']);
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
    this.router.navigate(['admin/caja']);
  }

}

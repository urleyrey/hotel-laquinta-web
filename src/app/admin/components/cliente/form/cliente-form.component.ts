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
import { TIpoDocumentoData } from 'src/app/admin/data/tipo-documento.data';
import { ReservaService } from 'src/app/core/services/api/reserva.service';
import { GeneralService } from 'src/app/core/services/api/general.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClienteFormComponent implements OnInit {

  @ViewChild('picker', { static: true }) picker: any;

  private tabla="cliente";
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


  listadoTipoDocumentos = JSON.parse(JSON.stringify(TIpoDocumentoData)).tipos;

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
    "title": 'Cliente',
    "subtitle": 'Información de Cliente'
  }
  myForm!: FormGroup;
  
  constructor(private router: Router,  private route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService,
    private generalService: GeneralService){
      
      this.myForm = fb.group({
        tipoDocumento: ['', [Validators.required]],
        numeroDocumento: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
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
          this.myForm.controls['tipoDocumento'].setValue(this.data.tipoDocumento);
          this.myForm.controls['numeroDocumento'].setValue(this.data.numeroDocumento);
          this.myForm.controls['nombres'].setValue(this.data.nombres);
          this.myForm.controls['apellidos'].setValue(this.data.apellidos);
          this.myForm.controls['direccion'].setValue(this.data.direccion);
          this.myForm.controls['email'].setValue(this.data.email);
          this.myForm.controls['telefono'].setValue(this.data.telefono);
          this.myForm.controls['sexo'].setValue(this.data.sexo);
          this.myForm.controls['fechaNacimiento'].setValue(this.data.fechaNacimiento);
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
    if(form.value.tipoDocumento != this.data.tipoDocumento){
      this.updateExpression+="tipoDocumento=:tipoDocumento,";
      this.updateValues[':tipoDocumento']=form.value.tipoDocumento;
      this.camposEditados+=" TIPO DE DOCUMENTO,";
    }
    if(form.value.numeroDocumento != this.data.numeroDocumento){
      this.updateExpression+="numeroDocumento=:numeroDocumento,";
      this.updateValues[':numeroDocumento']=form.value.numeroDocumento+"";
      this.camposEditados+=" NUMERO DE DOCUMENTO,";
    }
    if(form.value.nombres != this.data.nombres){
      this.updateExpression+="nombres=:nombres,";
      this.updateValues[':nombres']=form.value.nombres;
      this.camposEditados+=" NOMBRES,";
    }
    if(form.value.apellidos != this.data.apellidos){
      this.updateExpression+="apellidos=:apellidos,";
      this.updateValues[':apellidos']=form.value.apellidos;
      this.camposEditados+=" APELLIDOS,";
    }
    if(form.value.direccion != this.data.direccion){
      this.updateExpression+="direccion=:direccion,";
      this.updateValues[':direccion']=form.value.direccion;
      this.camposEditados+=" DIRECCION,";
    }
    if(form.value.email != this.data.email){
      this.updateExpression+="email=:email,";
      this.updateValues[':email']=form.value.email;
      this.camposEditados+=" EMAIL,";
    }
    if(form.value.telefono != this.data.telefono){
      this.updateExpression+="telefono=:telefono,";
      this.updateValues[':telefono']=form.value.telefono;
      this.camposEditados+=" TELEFONO,";
    }
    if(form.value.sexo != this.data.sexo){
      this.updateExpression+="sexo=:sexo,";
      this.updateValues[':sexo']=form.value.sexo;
      this.camposEditados+=" SEXO,";
    }
    if(form.value.fechaNacimiento != this.data.fechaNacimiento){
      this.updateExpression+="fechaNacimiento=:fechaNacimiento,";
      this.updateValues[':fechaNacimiento']=form.value.fechaNacimiento;
      this.camposEditados+=" FECHA NACIMIENTO,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.generalService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues, this.tabla)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
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
    this.router.navigate(['admin/cliente']);
  }

}

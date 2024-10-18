import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralPhpService } from 'src/app/core/services/api/general-php.service';
import { TipoHabitacionService } from 'src/app/core/services/api/tipo-habitacion.service';
import { UtilService } from 'src/app/core/services/util.service';
import { changeTipohabitacion } from 'src/app/state/actions/tipohabitacion.actions';

@Component({
  selector: 'app-tipo-habitacion-form',
  templateUrl: './tipo-habitacion-form.component.html',
  styleUrls: ['./tipo-habitacion-form.component.scss']
})
export class TipoHabitacionFormComponent{
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
    "title": 'Tipo de Habitacion',
    "subtitle": 'Listado de tipos de habitaciones regitrados'
  }
  myForm!: FormGroup;
  table= "tipohabitacion";
  
  constructor(private router: Router,  route: ActivatedRoute,
    private tipoHabitacionService: TipoHabitacionService,
    private generalPhpSvc: GeneralPhpService,
    private fb: FormBuilder, private utilService: UtilService,
    private store: Store<any>){
      this.myForm = fb.group({
        nombre: ['', [Validators.required ,Validators.minLength(2)]],
        numeroPersonas: ['', [Validators.required, Validators.min(1)]],
        maximoPersonas: ['', [Validators.required, Validators.min(1)]],
        numeroCamas: ['', [Validators.required, Validators.min(1)]],
        descripcion: ['', [Validators.required]],
        color: ['#42A5F5']
      });

      this.id=route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';
      console.log("ID: ",this.id);
      
      if(this.action == 'editar'){
        this.loading = true;
        this.generalPhpSvc.read(this.table, this.id).subscribe((res: any) => {
          this.data = res.data[0];
          this.myForm.controls['nombre'].setValue(this.data.nombre);
          this.myForm.controls['numeroPersonas'].setValue(this.data.numeroPersonas);
          this.myForm.controls['maximoPersonas'].setValue(this.data.maximoPersonas);
          this.myForm.controls['numeroCamas'].setValue(this.data.numeroCamas);
          this.myForm.controls['descripcion'].setValue(this.data.descripcion);
          this.myForm.controls['color'].setValue(this.data.color);
          this.loading=false;
        });
      }
      
  }

  onSubmit(form: any) {
    if(this.action=='editar'){
      this.putFieldsPhp(form);  
    }
    else{
      this.generalPhpSvc.create(this.table, form.value).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          this.router.navigate(['/admin','tipo-habitacion']);
        });
      });
    }
  }

  putFieldsPhp(form: any){
    if(form.value.nombre != this.data.nombre){
      this.updateValues['nombre']=form.value.nombre;
      this.camposEditados+=" NOMBRE,";
    }
    if(form.value.numeroPersonas != this.data.numeroPersonas){
      this.updateValues['numeroPersonas']=form.value.numeroPersonas+"";
      this.camposEditados+=" NUMERO DE PERSONAS,";
    }
    if(form.value.maximoPersonas != this.data.maximoPersonas){
      this.updateValues['maximoPersonas']=form.value.maximoPersonas;
      this.camposEditados+=" MAXIMO DE PERSONAS,";
    }
    if(form.value.numeroCamas != this.data.numeroCamas){
      this.updateValues['numeroCamas']=form.value.numeroCamas;
      this.camposEditados+=" NUMERO DE CAMAS,";
    }
    if(form.value.descripcion != this.data.descripcion){
      this.updateValues['descripcion']=form.value.descripcion;
      this.camposEditados+=" DESCRIPCION,";
    }
    if(form.value.color != this.data.color){
      this.updateValues['color']=form.value.color;
      this.camposEditados+=" COLOR,";
    }
    
    console.log(this.updateExpression, this.updateValues);
    this.generalPhpSvc.update(this.table, this.updateValues, this.id)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.router.navigate(['/admin','tipo-habitacion']);
      });
    });
  }

  putFields(form: any){
    if(form.value.nombre != this.data.nombre){
      this.updateExpression+="nombre=:nombre,";
      this.updateValues[':nombre']=form.value.nombre;
      this.camposEditados+=" NOMBRE,";
    }
    if(form.value.numeroPersonas != this.data.numeroPersonas){
      this.updateExpression+="numeroPersonas=:numeroPersonas,";
      this.updateValues[':numeroPersonas']=form.value.numeroPersonas+"";
      this.camposEditados+=" NUMERO DE PERSONAS,";
    }
    if(form.value.maximoPersonas != this.data.maximoPersonas){
      this.updateExpression+="maximoPersonas=:maximoPersonas,";
      this.updateValues[':maximoPersonas']=form.value.maximoPersonas;
      this.camposEditados+=" MAXIMO DE PERSONAS,";
    }
    if(form.value.numeroCamas != this.data.numeroCamas){
      this.updateExpression+="numeroCamas=:numeroCamas,";
      this.updateValues[':numeroCamas']=form.value.numeroCamas;
      this.camposEditados+=" NUMERO DE CAMAS,";
    }
    if(form.value.descripcion != this.data.descripcion){
      this.updateExpression+="descripcion=:descripcion,";
      this.updateValues[':descripcion']=form.value.descripcion;
      this.camposEditados+=" DESCRIPCION,";
    }
    if(form.value.color != this.data.color){
      this.updateExpression+="color=:color,";
      this.updateValues[':color']=form.value.color;
      this.camposEditados+=" COLOR,";
    }
    this.updateExpression="set "+this.updateExpression;

    console.log(this.updateExpression, this.updateValues);
    this.tipoHabitacionService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.store.dispatch(changeTipohabitacion(
          {cargado: false}
        ));
        this.router.navigate(['/admin','tipo-habitacion']);
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
    this.router.navigate(['admin/tipo-habitacion']);
  }

}

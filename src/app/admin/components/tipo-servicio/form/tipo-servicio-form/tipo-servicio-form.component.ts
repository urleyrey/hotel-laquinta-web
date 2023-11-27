import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TipoServicioService } from 'src/app/core/services/api/tipo-servicio.service';
import { UtilService } from 'src/app/core/services/util.service';
import { changeTiposervicio } from 'src/app/state/actions/tiposervicio.actions';

@Component({
  selector: 'app-tipo-servicio-form',
  templateUrl: './tipo-servicio-form.component.html',
  styleUrls: ['./tipo-servicio-form.component.scss']
})
export class TipoServicioFormComponent {
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
    "title": 'Tipo de Servicio',
    "subtitle": 'Listado de tipos de servicio regitrados'
  }
  myForm!: FormGroup;
  
  constructor(private router: Router,  route: ActivatedRoute,
    private tipoServicioService: TipoServicioService, 
    private fb: FormBuilder, private utilService: UtilService,
    private store: Store<any>){
      this.myForm = fb.group({
        nombre: ['', [Validators.required ,Validators.minLength(2)]],
        descripcion: ['', [Validators.required]],
        icono: ['home']
      });

      this.id=route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';

      if(this.action == 'editar'){
        this.tipoServicioService.get(this.id).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          this.myForm.controls['nombre'].setValue(this.data.nombre);
          this.myForm.controls['icono'].setValue(this.data.icono);
          this.myForm.controls['descripcion'].setValue(this.data.descripcion);
        });
      }
      
  }

  onSubmit(form: any) {
    this.loading=true;
    if(this.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.tipoServicioService.post(form.value).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          this.store.dispatch(changeTiposervicio(
            {cargado: false}
          ));
          this.router.navigate(['/admin','tipo-servicio']);
        });
      });
    }
  }

  patch(form:any){
    if(form.value.nombre != this.data.nombre){
        this.duration+=this.durationLimit;
        this.patchField('NOMBRE', 'nombre',form.value.nombre, this.duration);
      }
      if(form.value.numeroPersonas != this.data.numeroPersonas){
        this.duration+=this.durationLimit;
        this.patchField('NUMERO DE PERSONAS', 'numeroPersonas',form.value.numeroPersonas, this.duration); 
      }
      if(form.value.maximoPersonas != this.data.maximoPersonas){
        this.duration+=this.durationLimit;
        this.patchField('MAXIMO DE PERSONAS', 'maximoPersonas',form.value.maximoPersonas, this.duration); 
      }
      if(form.value.numeroCamas != this.data.numeroCamas){
        this.duration+=this.durationLimit;
        this.patchField('NUMERO DE CAMAS', 'numeroCamas',form.value.numeroCamas, this.duration); 
      }
      if(form.value.descripcion != this.data.descripcion){
        this.duration+=this.durationLimit;
        this.patchField('DESCRIPCION', 'descripcion',form.value.descripcion, this.duration);
      }
      setTimeout(() => {
        this.router.navigate(['/admin','tipo-habitacion']);
      }, this.duration+1000);
  }

  patchField(field:string, key:string, value:string, duration:number){
    setTimeout(() => {
      this.tipoServicioService.patch(this.id, key, value).subscribe((res) => {
        this.utilService.openSnackBar(`<< ${field} >> Editado Correctamente`, "Ok", this.durationLimit);
      })
     }, duration);
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
    this.updateExpression="set "+this.updateExpression;

    this.tipoServicioService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.store.dispatch(changeTiposervicio(
          {cargado: false}
        ));
        this.router.navigate(['/admin','tipo-servicio']);
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

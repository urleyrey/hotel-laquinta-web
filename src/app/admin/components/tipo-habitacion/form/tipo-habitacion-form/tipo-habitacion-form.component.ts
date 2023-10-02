import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { UtilService } from 'src/app/core/services/util.service';

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
  
  constructor(private router: Router,  route: ActivatedRoute,
    private estadoHabitacionService: EstadoHabitacionService, 
    private fb: FormBuilder, private utilService: UtilService){
      this.myForm = fb.group({
        nombre: ['', [Validators.required ,Validators.minLength(2)]],
        numeroPersonas: ['', [Validators.required, Validators.min(1)]],
        maximoPersonas: ['', [Validators.required, Validators.min(1)]],
        numeroCamas: ['', [Validators.required, Validators.min(1)]],
        descripcion: ['', [Validators.required]],
        tipo: ['#42A5F5']
      });

      this.id=route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';

      if(this.action == 'editar'){
        this.loading = true;
        this.estadoHabitacionService.get(this.id).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          this.myForm.controls['nombre'].setValue(this.data.nombre);
          this.myForm.controls['numeroPersonas'].setValue(this.data.numeroPersonas);
          this.myForm.controls['maximoPersonas'].setValue(this.data.maximoPersonas);
          this.myForm.controls['numeroCamas'].setValue(this.data.numeroCamas);
          this.myForm.controls['descripcion'].setValue(this.data.descripcion);
          this.loading=false;
        });
      }
      
  }

  onSubmit(form: any) {
    if(this.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.estadoHabitacionService.post(form.value).subscribe((res) => {
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          this.router.navigate(['/admin','tipo-habitacion']);
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

    this.estadoHabitacionService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
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

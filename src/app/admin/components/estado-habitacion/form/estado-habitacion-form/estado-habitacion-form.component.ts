import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EstadoHabitacionService } from 'src/app/core/services/api/estado-habitacion.service';
import { UtilService } from 'src/app/core/services/util.service';
import { changeEstadohabitacion } from 'src/app/state/actions/estadohabitacion.actions';

@Component({
  selector: 'app-estado-habitacion-form',
  templateUrl: './estado-habitacion-form.component.html',
  styleUrls: ['./estado-habitacion-form.component.scss']
})
export class EstadoHabitacionFormComponent {
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
    "title": 'Estados de Habitacion',
    "subtitle": 'Listado de estados de habitaciones regitrados'
  }
  myForm!: FormGroup;
  
  constructor(private router: Router,  route: ActivatedRoute,
    private estadoHabitacionService: EstadoHabitacionService, 
    private fb: FormBuilder, private utilService: UtilService,
    private store: Store<any>){
      this.myForm = fb.group({
        nombre: ['', [Validators.required ,Validators.minLength(2)]],
        descripcion: ['', [Validators.required]],
        color: ['#42A5F5']
      });

      this.id=route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';

      if(this.action == 'editar'){
        this.loading=true;
        this.estadoHabitacionService.get(this.id).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          this.myForm.controls['nombre'].setValue(this.data.nombre);
          this.myForm.controls['descripcion'].setValue(this.data.descripcion);
          this.myForm.controls['color'].setValue(this.data.color);
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
          this.store.dispatch(changeEstadohabitacion(
            {cargado: false}
          ));
          this.router.navigate(['/admin','estado-habitacion']);
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

    this.estadoHabitacionService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.store.dispatch(changeEstadohabitacion(
          {cargado: false}
        ));
        this.router.navigate(['/admin','estado-habitacion']);
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
    this.router.navigate(['admin/estado-habitacion']);
  }
}

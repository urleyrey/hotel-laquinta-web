import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { UtilService } from 'src/app/core/services/util.service';
import { changeNivel } from 'src/app/state/actions/nivel.actions';

@Component({
  selector: 'app-nivel-form',
  templateUrl: './nivel-form.component.html',
  styleUrls: ['./nivel-form.component.scss']
})
export class NivelFormComponent {
  action:string = 'crear';
  encabezado = {
    "title": 'Niveles o Pisos',
    "subtitle": 'Listado de Niveles/Pisos regitrados'
  };
  myForm!: FormGroup;
  loading:boolean = false;
  id: any;
  updateExpression:string = '';
  updateValues:any = {};
  camposEditados:string = '';

  constructor(private router: Router,  route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService,
    private nivelService: NivelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NivelFormComponent>,
    private store: Store<any>){
      console.log(data);
      this.myForm = fb.group({
        posicion: ['', [Validators.required ]],
        descripcion: ['', [Validators.required]]
      });
      this.id=data.campos.id!;
      
      if(data.action == 'editar'){
        this.myForm.controls['posicion'].setValue(this.data.campos.posicion);
        this.myForm.controls['descripcion'].setValue(this.data.campos.descripcion);
      }
  }

  onSubmit(form: any) {
    this.loading=true;
    if(this.data.action=='editar'){
      this.putFields(form);  
    }
    else{
      this.nivelService.post(form.value).subscribe((res) => {
        this.dialogRef.close();
        this.utilService.openSwalBasic("Atencion","Información Registrada Correctamente", "success").then(() => {
          this.store.dispatch(changeNivel(
            {cargado: false}
          ));
          this.router.navigate(['/admin','nivel']);
        });
      });
    }
  } 
  
  putFields(form: any){
    if(form.value.nombre != this.data.nombre){
      this.updateExpression+="posicion=:posicion,";
      this.updateValues[':posicion']=form.value.nombre;
      this.camposEditados+=" POSICION,";
    }
    if(form.value.descripcion != this.data.descripcion){
      this.updateExpression+="descripcion=:descripcion,";
      this.updateValues[':descripcion']=form.value.descripcion;
      this.camposEditados+=" DESCRIPCION,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.nivelService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues)
    .subscribe((res) => {
      this.dialogRef.close();
      this.store.dispatch(changeNivel(
        {cargado: false}
      ));
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.router.navigate(['/admin','nivel']);
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
    this.router.navigate(['admin/nivel']);
  }

}

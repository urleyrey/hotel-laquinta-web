import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/core/services/util.service';

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

  constructor(private router: Router,  route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService){
      this.myForm = fb.group({
        nombre: ['', [Validators.required ,Validators.maxLength(3)]],
        posicion: ['', [Validators.required ]],
        descripcion: ['', [Validators.required]]
      });
  }

  onSubmit(form: any) {
      
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

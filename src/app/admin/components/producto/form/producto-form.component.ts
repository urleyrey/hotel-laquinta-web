import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/core/services/util.service';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { TipoProductoData } from 'src/app/admin/data/tipo-producto.data';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductoFormComponent implements OnInit {
  private tabla="producto";

  listadoTipoProductos = JSON.parse(JSON.stringify(TipoProductoData)).tipos;

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
    "title": 'Producto',
    "subtitle": 'Información de Producto'
  }
  myForm!: FormGroup;
  
  constructor(private router: Router,  private route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService,
    private generalService: GeneralService){
      
      this.myForm = fb.group({
        descripcion: ['', [Validators.required]],
        valor: ['', [Validators.required]],
        tipoProducto: ['', [Validators.required]],
      });
      
  }

  async ngOnInit(): Promise<void> {
    this.id=this.route.snapshot.paramMap.get('id')!;
      this.id=='0'?this.action='crear':this.action='editar';
      console.log("ID: ",this.id);
      
      if(this.action == 'editar'){
        this.generalService.get(this.id, this.tabla).subscribe((res: any) => {
          this.data = JSON.parse(res.body);
          console.log(this.data);
          this.myForm.controls['descripcion'].setValue(this.data.descripcion);
          this.myForm.controls['valor'].setValue(this.data.valor);
          this.myForm.controls['tipoProducto'].setValue(this.data.tipoProducto);
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
          
          this.router.navigate(['/admin','producto']);
        });
      });
    }
  }

  putFields(form: any){
    if(form.value.descripcion != this.data.descripcion){
      this.updateExpression+="descripcion=:descripcion,";
      this.updateValues[':descripcion']=form.value.descripcion;
      this.camposEditados+=" DESCRIPCION,";
    }
    if(form.value.valor != this.data.valor){
      this.updateExpression+="valor=:valor,";
      this.updateValues[':valor']=form.value.valor+"";
      this.camposEditados+=" VALOR,";
    }
    if(form.value.tipoProducto != this.data.tipoProducto){
      this.updateExpression+="tipoProducto=:tipoProducto,";
      this.updateValues[':tipoProducto']=form.value.tipoProducto;
      this.camposEditados+=" TIPO DE PRODUCTO,";
    }
    this.updateExpression="set "+this.updateExpression;

    this.generalService.put(this.id, this.updateExpression.substring(0, this.updateExpression.length - 1), this.updateValues, this.tabla)
    .subscribe((res) => {
      this.utilService.openSwalBasic('Atención',`Campos ${this.camposEditados} Editados Correctamente`, "success").then(() => {
        this.router.navigate(['/admin','producto']);
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
    this.router.navigate(['admin/producto']);
  }
}

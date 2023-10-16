import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { NivelFormComponent } from './form/nivel-form/nivel-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNivelCargado, selectNivelList, selectNivelLoading } from 'src/app/state/selectors/nivel.selectors';
import { loadNivel, loadedNivel } from 'src/app/state/actions/nivel.actions';
import { KeyValue } from '@angular/common';


@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.scss']
})
export class NivelComponent implements OnInit{
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  loading:boolean = false;
  listado:any = [];
  encabezado = {
    "title": 'Niveles',
    "subtitle": 'Listado de Niveles(Pisos) regitrados'
  }
  
  loading$: Observable<boolean> = new Observable();
  cargado$: Observable<boolean> = new Observable();

  constructor(private nivelService: NivelService, 
              private utilService: UtilService, 
              public dialog: MatDialog,
              private store: Store<any>) {
    //this.cargarListado();
  }

  ngOnInit(): void{
    this.loading$ = this.store.select(selectNivelLoading);
    this.store.dispatch(loadNivel());
    this.cargado$ = this.store.select(selectNivelCargado);
    this.cargado$.subscribe(value => {
      if(!value){
        this.cargarListadoApi();
      }else{
        this.cargarListadoStore();
      }
    })
  }

  async cargarListadoApi(){
    await this.nivelService.getAll().subscribe((res:any) => {
      this.listado = JSON.parse(res.body).listado;
      this.store.dispatch(
        loadedNivel(
          {niveles: this.listado}
        )
      );
    });
  }

  async cargarListadoStore(){
    await this.store.select(selectNivelList).subscribe(res => {
      console.log(res);
      this.listado = res;
      this.store.dispatch(
        loadedNivel(
          {niveles: this.listado}
        )
      );
    });
  }

  abrirDialog(){
    const dialogRef = this.dialog.open(NivelFormComponent, {
      width: '30%',
      data: { name: "nombre", animal: "animal" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


  delete(id:string){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Una vez eliminado, no puedes revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.nivelService.delete(id).subscribe((res) => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido borrado.',
            'success'
          ).then(() =>{
            this.utilService.reloadCurrentRoute();
          })
        });
      }
    })
  }

  indexOrderAsc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
    const a = akv.value.id;
    const b = bkv.value.id;

    return a > b ? 1 : (b > a ? -1 : 0);
  };

  indexOrderDesc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
    const a = akv.value.id;
    const b = bkv.value.id;

    return a < b ? 1 : (b < a ? -1 : 0);
  };

}

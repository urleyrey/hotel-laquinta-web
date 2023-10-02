import { Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NivelService } from 'src/app/core/services/api/nivel.service';
import { UtilService } from 'src/app/core/services/util.service';
import Swal from 'sweetalert2';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { NivelFormComponent } from './form/nivel-form/nivel-form.component';


@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.scss']
})
export class NivelComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  loading:boolean = false;
  listado:any = [];
  encabezado = {
    "title": 'Niveles',
    "subtitle": 'Listado de Niveles(Pisos) regitrados'
  }

  constructor(private nivelService: NivelService, private utilService: UtilService, public dialog: MatDialog) {
    //this.cargarListado();
  }

  async cargarListado(){
    this.loading=true;
    await this.nivelService.getAll().subscribe((res:any) => {
      this.listado = JSON.parse(res.body).habitaciones;
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
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  iconos:string[]=['success', 'error', 'warning', 'info', 'question'];

  constructor(public snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  openSwalBasic(title:string, message:string, icon:string){
    return Swal.fire(title, message, icon as SweetAlertIcon);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  getObjeto(id:string, listado:any){
    return listado.find((v:any)=>{
      return v.id == id;
    });
  }

  getObjetos(ids:string[], listado:any){
    ids.forEach((id, index) => {
      let srv = this.getObjeto(id, listado);
      ids[index] = srv;
    })
    return ids;
  }
}

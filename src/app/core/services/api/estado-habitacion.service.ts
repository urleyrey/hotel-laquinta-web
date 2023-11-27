import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/environments/endpoints-api'
import { selectEstadohabitacionList } from 'src/app/state/selectors/estadohabitacion.selectors';
import { Store } from '@ngrx/store';
import { loadedEstadohabitacion, loadedEstadohabitacionStore } from 'src/app/state/actions/estadohabitacion.actions';

@Injectable({
  providedIn: 'root'
})
export class EstadoHabitacionService {

  urlAll:string=api.endpoints.estadohabitacionAll;
  urlOne:string=api.endpoints.estadohabitacionOne;

  constructor(private httpClient: HttpClient, private store: Store<any>) { }

  async getAll(){
    return await this.httpClient.get(`${api.url}/${api.stage}/${this.urlAll}`).toPromise();
  }

  get(id: string){
    return this.httpClient.get(`${api.url}/${api.stage}/${this.urlOne}?id=${id}`);
  }

  post(body:{}){
    return this.httpClient.post(`${api.url}/${api.stage}/${this.urlOne}`, body);
  }

  delete(id:string){
    const body:any = {"body":{"id":id}};
    return this.httpClient.delete(`${api.url}/${api.stage}/${this.urlOne}`, body);
  }

  patch(id:string, key:string, value:any){
    const body = {"id":id,
    "updateKey":key,
    "updateValue":value
  };
    return this.httpClient.patch(`${api.url}/${api.stage}/${this.urlOne}`, body);
  }

  put(id:string, updateExpression:string, updateValues:any){
    const body = {
      "id":id, 
      "updateExpression":updateExpression,
      "updateValues":updateValues
    };
    return this.httpClient.put(`${api.url}/${api.stage}/${this.urlOne}`, body);
  }

  async getAllApi(){
    let res:any = await this.getAll();
    let listado = JSON.parse(res.body).listado;

    this.store.dispatch(
      loadedEstadohabitacion(
        {estadoHabitaciones: listado}
      )
    );

    return listado;
  }

  async getAllStore(){
    this.store.dispatch(
      loadedEstadohabitacionStore()
    );

    return await this.store.select(selectEstadohabitacionList);
  } 
}

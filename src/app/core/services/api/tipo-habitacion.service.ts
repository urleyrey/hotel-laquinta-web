import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from 'src/app/environments/endpoints-api'
import { Store } from '@ngrx/store';
import { loadedTipohabitacion, loadedTipohabitacionStore } from 'src/app/state/actions/tipohabitacion.actions';
import { selectTipohabitacionList } from 'src/app/state/selectors/tipohabitacion.selectors';
@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {

  urlAll:string=api.endpoints.tipohabitacionAll;
  urlOne:string=api.endpoints.tipohabitacionOne;

  constructor(private httpClient: HttpClient, private store:Store<any>) { }

  async getAll(){
    // return await this.httpClient.get(`${api.url}/${api.stage}/${this.urlAll}`).toPromise();
    console.log("PRUEBA read.php");
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const read = "{\"table\":\"tipohabitacion\",\"select\":[\"*\"],\"order\":{\"on\":\"id\",\"type\":\"DESC\"}}";
    return await this.httpClient.post(`http://localhost/hotel_api/read.php`, JSON.parse(JSON.stringify(read)), {headers: headers});
  }

  get(id: string){
    return this.httpClient.get(`${api.url}/${api.stage}/${this.urlOne}?id=${id}`);
  }

  post(body:{}){
    // return this.httpClient.post(`${api.url}/${api.stage}/${this.urlOne}`, body);
    console.log("PRUEBA create.php");
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    body = "{\"table\":\"tipohabitacion\",\"validation\":[{\"nombre\":\"required\",\"numeropersonas\":\"required\",\"maximopersonas\":\"required\",\"numerocamas\":\"required\",\"descripcion\":\"required\",\"color\":\"required\"}],\"data\":[{\"nombre\":\"Pruebapostman2\",\"numeropersonas\":\"1\",\"maximopersonas\":\"1\",\"numerocamas\":\"1\",\"descripcion\":\"Descripcionpostman2\",\"color\":\"rgb(0,0,0)\"}]}";
    return this.httpClient.post(`http://localhost/hotel_api/create.php`, JSON.parse(JSON.stringify(body)), {headers: headers});
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
    // let listado = JSON.parse(res.body).listado;
    let listado = res;

    this.store.dispatch(
      loadedTipohabitacion(
        {tipoHabitaciones: listado}
      )
    );

    return listado;
  }

  async getAllStore(){
    this.store.dispatch(
      loadedTipohabitacionStore()
    );

    return await this.store.select(selectTipohabitacionList);
  }
}

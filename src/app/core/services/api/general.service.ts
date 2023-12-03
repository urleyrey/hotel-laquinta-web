import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/environments/endpoints-api'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  urlAll:string=api.endpoints.generalAll;
  urlOne:string=api.endpoints.generalOne;

  constructor(private httpClient: HttpClient) { }

  async getAll(tabla: string){
    console.log("PRUEBA:", `${api.url}/${api.stage}/${this.urlAll}?table=${tabla}`);
    return await this.httpClient.get(`${api.url}/${api.stage}/${this.urlAll}?table=${tabla}`).toPromise();
  }

  get(id: string, tabla: string){
    return this.httpClient.get(`${api.url}/${api.stage}/${this.urlOne}?id=${id}&table=${tabla}`);
  }

  post(body:{}, tabla: string){
    return this.httpClient.post(`${api.url}/${api.stage}/${this.urlOne}?table=${tabla}`, body);
  }

  delete(id:string, tabla: string){
    const body:any = {"body":{"id":id}};
    return this.httpClient.delete(`${api.url}/${api.stage}/${this.urlOne}?table=${tabla}`, body);
  }

  patch(id:string, key:string, value:any, tabla: string){
    const body = {"id":id,
    "updateKey":key,
    "updateValue":value
  };
    return this.httpClient.patch(`${api.url}/${api.stage}/${this.urlOne}?table=${tabla}`, body);
  }

  put(id:string, updateExpression:string, updateValues:any, tabla: string){
    const body = {
      "id":id, 
      "updateExpression":updateExpression,
      "updateValues":updateValues
    };
    return this.httpClient.put(`${api.url}/${api.stage}/${this.urlOne}?table=${tabla}`, body);
  }

  async getAllApi(tabla: string){
    let res:any = await this.getAll(tabla);
    let listado = JSON.parse(res.body).listado;

    return listado;
  }

}

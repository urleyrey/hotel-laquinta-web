import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/environments/endpoints-api'
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralPhpService {

  constructor(private httpClient: HttpClient, private utilSvc: UtilService) { }

  create(table:string, body:{}){
    console.log("PRUEBA GENERAL create.php");

    let payload = {"table": table, "data": [body]}
    
    body = "{\"table\":\"tipohabitacion\",\"validation\":[{\"nombre\":\"required\",\"numeropersonas\":\"required\",\"maximopersonas\":\"required\",\"numerocamas\":\"required\",\"descripcion\":\"required\",\"color\":\"required\"}],\"data\":[{\"nombre\":\"Pruebapostman2\",\"numeropersonas\":\"1\",\"maximopersonas\":\"1\",\"numerocamas\":\"1\",\"descripcion\":\"Descripcionpostman2\",\"color\":\"rgb(0,0,0)\"}]}";
    return this.httpClient.post(`${api.url_php}/${api.api_php_create}`, JSON.parse(JSON.stringify(payload)), {headers: this.utilSvc.getHeader()});
  }

  update(table:string, body:{}, id:string){
    console.log("PRUEBA GENERAL update.php");

    let payload = {"table": table, "data": [body], "conditions":[{
      "on":"id",
      "type": "=",
      "value": id
    }]}
    console.log(payload, JSON.parse(JSON.stringify(payload)));
    
    body = "{\"table\":\"tipohabitacion\",\"validation\":[{\"nombre\":\"required\",\"numeropersonas\":\"required\",\"maximopersonas\":\"required\",\"numerocamas\":\"required\",\"descripcion\":\"required\",\"color\":\"required\"}],\"data\":[{\"nombre\":\"Pruebapostman2\",\"numeropersonas\":\"1\",\"maximopersonas\":\"1\",\"numerocamas\":\"1\",\"descripcion\":\"Descripcionpostman2\",\"color\":\"rgb(0,0,0)\"}]}";
    return this.httpClient.post(`${api.url_php}/${api.api_php_update}`, JSON.parse(JSON.stringify(payload)), {headers: this.utilSvc.getHeader()});
  }

  async readAll(table: string){
    // return await this.httpClient.get(`${api.url}/${api.stage}/${this.urlAll}`).toPromise();
    console.log("PRUEBA GENERAL read.php");
    let payload = {"table": table, "select": ["*"]}

    const read = "{\"table\":\"tipohabitacion\",\"select\":[\"*\"],\"order\":{\"on\":\"id\",\"type\":\"DESC\"}}";
    return await this.httpClient.post(`${api.url_php}/${api.api_php_read}`, JSON.parse(JSON.stringify(payload)), {headers: this.utilSvc.getHeader()});
  }

  read(table: string, id: string){
    // return await this.httpClient.get(`${api.url}/${api.stage}/${this.urlAll}`).toPromise();
    console.log("PRUEBA GENERAL read.php");
    let payload = {"table": table, "select": ["*"], "rawConditions": [`WHERE id = '${id}'`]}

    const read = "{\"table\":\"tipohabitacion\",\"select\":[\"*\"],\"order\":{\"on\":\"id\",\"type\":\"DESC\"}}";
    return this.httpClient.post(`${api.url_php}/${api.api_php_read}`, JSON.parse(JSON.stringify(payload)), {headers: this.utilSvc.getHeader()});
  }

  delete(table: string, id: string){
    // return await this.httpClient.get(`${api.url}/${api.stage}/${this.urlAll}`).toPromise();
    console.log("PRUEBA GENERAL delete.php");
    let payload = {"table": table, "conditions": [{
      "on":"id",
      "type": "=",
      "value": id
    }]}

    const read = "{\"table\":\"tipohabitacion\",\"conditions\":[{\"on\":\"id\",\"type\":\"=\",\"value\":\"5\"}]}";
    return this.httpClient.post(`${api.url_php}/${api.api_php_delete}`, JSON.parse(JSON.stringify(payload)), {headers: this.utilSvc.getHeader()});
  }

}

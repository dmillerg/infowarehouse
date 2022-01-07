import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Factura } from 'src/app/models/factura';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'http://localhost:9706/apis/';

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) {
  }

  /**
   * Devuelve todas las facturas en la base de datos
   */
  listarFacturas(){
    let direccion = this.url + 'facturas';
    this.http.get<Factura>(direccion);
  }
}
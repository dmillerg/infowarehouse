import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/factura';
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';


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
   * Verifica las credenciales de un usuario y obtiene el token y demas datos
   */
  login(formData: FormData): Observable<Login> {
    let direccion = this.url + 'login';
    return this.http.post<Login>(direccion, formData);
  }

  /**
   * Desautentica a un usuario de la pagina
   * @returns 
   */
  logout() {
    let direccion = this.url + 'logout';
    let formData = new FormData();
    formData.append('id', this.storage.retrieve('user').id);
    return this.http.post(direccion, formData);
  }

  /**
   * Devuelve todas las facturas en la base de datos
   */
  listarFacturas(): Observable<Factura[]> {
    let direccion = this.url + 'facturas';
    return this.http.get<Factura[]>(direccion);
  }

  /**
   * Elimina una factura
   * @param codigo de factura a eliminar
   * @returns 
   */
  borrarFacturas(codigo: string = '') {
    let direccion = this.url + 'facturas/' + codigo;
    return this.http.delete(direccion);
  }
  
 /**
  * Se adiciona una factura
  * @param formData datos de la factura
  * @returns 
  */
  addFactura(formData: FormData) {
    let direccion = this.url + 'facturas';
    formData.append('token', this.storage.retrieve('user').token);
    return this.http.post(direccion, formData);
  }
}
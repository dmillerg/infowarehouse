import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/factura';
import { HistorialEstiba } from 'src/app/models/historial-estiba';
import { Informe } from 'src/app/models/informe';
import { Login } from 'src/app/models/login';
import { Producto } from 'src/app/models/producto';
import { TarjetaEstiba } from 'src/app/models/tarjeta-estiba';
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

  /**
   * Obtiene todos los tipos de productos almacenados en la base de datos
   * @returns 
   */
  listarProducto(): Observable<Producto[]> {
    let direccion = this.url + 'productos';
    return this.http.get<Producto[]>(direccion);
  }

  /**
   * Guarda un nuevo producto en la db
   * @param formData datos del producto 
   * @returns 
   */
  addProducto(formData: FormData) {
    let direccion = this.url + 'productos';
    formData.append('token', this.storage.retrieve('user').token);
    return this.http.post(direccion, formData);
  }

  /**
   * Eliminar un producto de la db
   * @param id del producto a borrar
   * @returns 
   */
  borrarProducto(id: number = -1) {
    let direccion = this.url + 'productos/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: this.storage.retrieve('user').token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Actualiza los datos de un producto
   * @param formData datos del producto
   * @param id del producto
   * @returns 
   */
  actualizarProducto(formData: FormData, id: number = -1) {
    let direccion = this.url + 'productos/' + id.toString();
    formData.append('token', this.storage.retrieve('user').token);
    return this.http.post(direccion, formData);
  }

  /**
   * Lista las tarjetas estibas
   * @returns 
   */
  listarTarjetasEstibas(): Observable<TarjetaEstiba[]>{
    let direccion = this.url + 'tarjetas';
    return this.http.get<TarjetaEstiba[]>(direccion);
  }

  /**
   * Agrega una tarjeta estiba
   * @param formData datos de la tarjeta estiba
   * @returns 
   */
  addTarjetasEstibas(formData: FormData){
    let direccion = this.url + 'tarjetas';
    formData.append('token', this.storage.retrieve('user').token);
    return this.http.post(direccion, formData);
  }

  /**
   * Eliminar una tarjeta de la db
   * @param codigo de la tarjeta a borrar
   * @returns 
   */
   borrarTarjeta(codigo: string = '') {
    let direccion = this.url + 'tarjetas/' + codigo;
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: this.storage.retrieve('user').token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Lista el historial de tarjetas estibas
   * @returns 
   */
   listarHistorialTarjetasEstibas(codigo: string= ""): Observable<HistorialEstiba[]>{
    let direccion = this.url + 'historialtarjeta/' + codigo;
    return this.http.get<HistorialEstiba[]>(direccion);
  }

  /**
   * Obtiene todos los informes dado un anno
   * @param anno de los informes
   * @returns 
   */
  listarInformesByAnno(anno: number=0): Observable<Informe[]>{
    let direccion = this.url + 'informe/' + anno;
    return this.http.get<Informe[]>(direccion);
  }
}
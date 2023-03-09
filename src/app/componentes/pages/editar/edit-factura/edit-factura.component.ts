import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-edit-factura',
  templateUrl: './edit-factura.component.html',
  styleUrls: ['./edit-factura.component.css']
})
export class EditFacturaComponent implements OnInit {

  factura: any;
  data: any;
  productos: any[] = [];

  constructor(private storage: SessionStorageService,
    private api: ApiService,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('pro', this.rutaActiva.snapshot.params["no_factura"]);
    this.getFactura()
  }

  getFactura() {
    this.api.getFacturaByNo(this.rutaActiva.snapshot.params["no_factura"]).subscribe(result => {
      console.log(result);
      this.data = result[0]
      this.data.entregado = this.data.entregado_por;
      this.data.facturado = this.data.facturado_por;
      this.data.entidad = this.data.entidad_suministradora;
      this.data.factura = this.data.no_factura;
      this.getProductos();
    })
  }

  getProductos() {

    this.api.getFacturaProducto(this.rutaActiva.snapshot.params["no_factura"]).subscribe(result => {
      this.productos = result;
      this.data.productos = this.productos;
      console.log('productos de la factura', result);
      console.log(this.productos);

    })
  }

}

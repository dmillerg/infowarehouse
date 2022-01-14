import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-add-facturas',
  templateUrl: './add-facturas.component.html',
  styleUrls: ['./add-facturas.component.css']
})
export class AddFacturasComponent implements OnInit {

  @Output() emisor: EventEmitter<any> = new EventEmitter();

  data = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    entidad: '',
    almacen: '',
    importe: 0,
    no: '',
  }

  productos: any[] = [];


  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.listarInformesByAnno(new Date().getFullYear()).subscribe((result) => {
      let num = result.length + 1
      this.data.no = (num < 10 ? '0' + num : num) + ' - ' + new Date().getFullYear();
    })
  }

  addFactura() {
    let formData = new FormData();
    formData.append('empresa', this.data.empresa);
    formData.append('codigo', this.data.codigo);
    formData.append('no_factura', this.data.factura);
    formData.append('entregado_por', this.data.entregado);
    formData.append('facturado_por', this.data.facturado);
    formData.append('entidad_suministradora', this.data.entidad);
    formData.append('almacen', this.data.almacen);
    formData.append('importe', this.data.importe.toString());
    this.api.addFactura(formData).subscribe((result) => {
      this.productos.forEach((e) => {
        this.addFacturaProducto(e);
      });
      this.addInformeRecepcion();
    });
  }

  addFacturaProducto(producto: any) {
    let formData = new FormData();
    formData.append('no_factura', this.data.factura);
    formData.append('codigo_producto', producto.codigo);
    formData.append('cantidad', producto.cantidad);
    this.api.addFacturaProducto(formData).subscribe((result) => {

    })
  }

  addInformeRecepcion() {
    let formData = new FormData();
    formData.append('no', this.data.no);
    formData.append('empresa', this.data.empresa);
    formData.append('almacen', this.data.almacen);
    formData.append('codigo', this.data.codigo);
    formData.append('recepcionado_por', this.data.entregado);
    formData.append('entidad_suministradora', this.data.entidad);
    formData.append('factura', this.data.factura);
    this.api.addInformeRecepcion(formData).subscribe((result) => {

    })
  }
}

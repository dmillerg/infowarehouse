import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Factura } from 'src/app/models/factura';
import { Informe } from 'src/app/models/informe';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';
import { ProgresSaveFactura } from '../../dialogs/progress-save-factura/progress-save-factura.component';

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
    no_anno: '',
  }

  productos: any[] = [];


  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getLastNumberInformeRecepcion().subscribe(result => {
      console.log(result);
      if (result.length>0)
        this.data.no = result[0].no + 1; else this.data.no = '01'
      this.data.no = Number(this.data.no) < 10 ? '0' + this.data.no : this.data.no;
      this.data.no_anno = this.data.no + '-' + new Date().getFullYear();
    })
  }

  add() {
    let factura: Factura = {
      fecha: '',
      empresa: this.data.empresa,
      codigo: this.data.codigo,
      no_factura: this.data.factura,
      entregado_por: this.data.entregado,
      facturado_por: this.data.facturado,
      entidad_suministradora: this.data.entidad,
      almacen: this.data.almacen,
      importe: this.data.importe,
    }

    let informe: Informe = {
      no: this.data.no,
      fecha: new Date(),
      empresa: this.data.empresa,
      almacen: this.data.almacen,
      codigo: this.data.codigo,
      recepcionado_por: this.data.entregado,
      entidad_suministradora: this.data.entidad,
      factura: this.data.factura,
      anno: new Date().getFullYear(),
      no_anno: this.data.no_anno,
    }

    this.dialog.open(ProgresSaveFactura, {
      data: { factura: factura, informe: informe, productos: this.productos }
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
      console.log(result)
      this.addInformeRecepcion();
    });
  }

  addFacturaProducto(producto: any) {
    let formData = new FormData();
    formData.append('no_factura', this.data.factura);
    formData.append('codigo_producto', producto.codigo);
    formData.append('cantidad', producto.cantidad);
    this.api.addFacturaProducto(formData).subscribe((result) => {

    });
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
      console.log(result)
    });
  }
}

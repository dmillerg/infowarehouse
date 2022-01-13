import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  }


  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
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
      this.emisor.emit('factura creada');
    });
  }

  addProducto(){
  }
}

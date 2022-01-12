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
  }


  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addFactura() {
    let formData = new FormData();
    formData.append('empresa', this.data.empresa);
    formData.append('codigo', this.data.codigo);
    this.api.addFactura(formData).subscribe((result) => {
      this.emisor.emit('factura creada');
    })
  }

  addProducto(){
  }
}

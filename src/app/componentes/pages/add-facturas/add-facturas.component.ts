import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/apis/api.service';
import { AddFacturaComponent } from '../../dialogs/add-factura/add-factura.component';

@Component({
  selector: 'app-add-facturas',
  templateUrl: './add-facturas.component.html',
  styleUrls: ['./add-facturas.component.css']
})
export class AddFacturasComponent implements OnInit {

  @Output() emisor: EventEmitter<any> = new EventEmitter();
  empresa: string = '';
  codigo: string = '';
  factura: string = '';
  entregado: string = '';
  facturado: string = '';

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addFactura() {
    let formData = new FormData();
    formData.append('empresa', this.empresa);
    formData.append('codigo', this.codigo);
    this.api.addFactura(formData).subscribe((result) => {
      this.emisor.emit('factura creada');
    })
  }

  addProducto(){
    let dialogRef = this.dialog.open(AddFacturaComponent, {
      data: undefined
    });
  }
}

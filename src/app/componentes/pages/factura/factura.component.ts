import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductoComponent } from '../../dialogs/add-producto/add-producto.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @Input() data: any = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
  };
  productos: any[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addProducto() {
    let datos = {
      data: undefined,
      accion: 'addproducto'
    }
    let dialogRef = this.dialog.open(AddProductoComponent, {
      data: this.data,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != undefined && result != '') {
        this.productos.push(result);
      }
    });
  }
}

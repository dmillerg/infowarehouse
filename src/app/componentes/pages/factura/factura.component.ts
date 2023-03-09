import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { AddProductoComponent } from '../../dialogs/add-producto/add-producto.component';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ transform: 'translateX(50%)', opacity: 0 }), stagger('100ms', animate('1000ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  animations: [
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate('.3s', style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('.3s', style({ transform: 'translateX(50%)', opacity: 0 })),
      ]),
    ]),
  ]
})
export class FacturaComponent implements OnInit {
  @Input() data: any = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    importe: 0,
  };
  @Input() productos: any[] = [];
  @Input() add_button: boolean = true;
  @Input() preview_button: boolean = true;
  @Input() edit: boolean = false;
  previsualizar: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addProducto() {
    let dialogRef = this.dialog.open(AddProductoComponent, {
      data: this.data,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != undefined && result != '') {
        if (this.productos.filter(e => e.codigo == result.codigo).length > 0) {
          this.productos = this.productos.map(e => {
            if (e.codigo == result.codigo) {
              e.cantidad += result.cantidad;
            }
            return e;
          })
        } else
          this.productos.push(result);
        this.data.importe += result.precio * result.cantidad;
      }
    });
  }

  deleteProducto(item: any) {
    this.data.importe -= item.precio * item.cantidad
    this.productos = this.productos.filter((e) => e.codigo != item.codigo);
    this.data.productos = this.productos;
  }
}

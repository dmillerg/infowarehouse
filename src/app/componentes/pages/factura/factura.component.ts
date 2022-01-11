import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  @Input() empresa: string = '';
  @Input() codigo: string = '';
  @Input() factura: string = '';
  @Input() entregado: string = '';
  @Input() facturado: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  addProducto(){

  }
}

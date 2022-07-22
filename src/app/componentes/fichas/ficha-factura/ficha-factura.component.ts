import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-factura',
  templateUrl: './ficha-factura.component.html',
  styleUrls: ['./ficha-factura.component.css']
})
export class FichaFacturaComponent implements OnInit {

  @Input() data: any = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    importe: 0,
  };
  @Input() productos: any[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}

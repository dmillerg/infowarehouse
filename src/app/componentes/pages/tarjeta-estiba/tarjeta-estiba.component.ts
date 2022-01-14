import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-estiba',
  templateUrl: './tarjeta-estiba.component.html',
  styleUrls: ['./tarjeta-estiba.component.css']
})
export class TarjetaEstibaComponent implements OnInit {

  @Input() data: any = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    importe: 0,
  };

  fecha = new Date();
  
  @Input() productos: any[] = [];
  previsualizar: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

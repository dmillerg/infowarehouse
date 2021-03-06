import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  @Input() data: any = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    importe: 0,
    no: '',
  };

  fecha = new Date();

  @Input() productos: any[] = [];
  previsualizar: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}

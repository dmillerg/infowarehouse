import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-informe',
  templateUrl: './ficha-informe.component.html',
  styleUrls: ['./ficha-informe.component.css']
})
export class FichaInformeComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    
  }

}

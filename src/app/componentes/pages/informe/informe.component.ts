import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  @Input() empresa: string = '';
  @Input() codigo: string = '';
  @Input() factura: string = '';
  @Input() entregado: string = '';
  @Input() facturado: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

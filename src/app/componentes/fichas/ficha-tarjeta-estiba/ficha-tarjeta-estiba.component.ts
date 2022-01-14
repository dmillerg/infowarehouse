import { Component, Input, OnInit } from '@angular/core';
import { HistorialEstiba } from 'src/app/models/historial-estiba';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-ficha-tarjeta-estiba',
  templateUrl: './ficha-tarjeta-estiba.component.html',
  styleUrls: ['./ficha-tarjeta-estiba.component.css']
})
export class FichaTarjetaEstibaComponent implements OnInit {

  @Input() data: any = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    importe: 0,
  };

  fecha = new Date();

  @Input() producto: Producto = {
    id: -1,
    codigo: '',
    nombre: '',
    precio: 0,
    precio_unitario: 0,
  };
  historial: HistorialEstiba[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.listarHistorialTarjetasEstibas(this.producto.codigo).subscribe((result) => {
      this.historial = result;
      console.log(result);
    });
  }

}

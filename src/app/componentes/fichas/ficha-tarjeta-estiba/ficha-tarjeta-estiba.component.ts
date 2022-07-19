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
    descripcion: '',
    precio: 0,
    precio_unitario: 0,
    cantidad: 0,
  };
  historial: HistorialEstiba[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.listarHistorialTarjetasEstibas(this.producto.codigo).subscribe((result: any) => {
      if(result.documents){
        this.historial = [];
        let histori: HistorialEstiba = {
          fecha: new Date(),
          clave: 'I/R',
          no: this.producto.codigo,
          entrada: this.producto.cantidad.toString(),
          salida: '-',
          saldo: this.producto.cantidad.toString(),
          firma: '',
        }
        this.historial.push(histori);
      }else this.historial = result;
    });
  }

}

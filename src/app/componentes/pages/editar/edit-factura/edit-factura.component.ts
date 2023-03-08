import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-edit-factura',
  templateUrl: './edit-factura.component.html',
  styleUrls: ['./edit-factura.component.css']
})
export class EditFacturaComponent implements OnInit {

  factura: any;
  data: any;
  productos: any[]=[];

  constructor(private storage: SessionStorageService,
    private api: ApiService,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('pro', this.rutaActiva.snapshot.params);
    
    if (this.storage.retrieve('factura')) {
      this.factura = this.storage.retrieve('factura');
      this.convert();
    }
    this.storage.observe('factura').subscribe(result => {
      this.factura = result;
      this.convert();
    });
  }

  convert() {
    this.data = {
      empresa: this.factura.empresa,
      codigo: this.factura.codigo,
      factura: this.factura.no_factura,
      entregado: this.factura.entregado_por,
      facturado: this.factura.facturado_por,
      importe: this.factura.importe,
      entidad: this.factura.entidad_suministradora,
      almacen: this.factura.almacen,
    }
    this.api.getFacturaProducto(this.factura.no_factura).subscribe(result=>{
      this.productos = result;
      console.log('productos de la factura',result);
      console.log(this.productos);
      
    })
  }

}

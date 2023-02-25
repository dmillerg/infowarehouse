import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-progress-save-factura',
  templateUrl: './progress-save-factura.component.html',
  styleUrls: ['./progress-save-factura.component.css']
})
export class ProgresSaveFactura implements OnInit {

  mensaje_progreso: string = 'Guardando la factura ...'
  detalles: any[] = []
  position_prod: number = 0;
  progreso: number = 0;

  constructor(private storage: SessionStorageService,
    private api: ApiService,
    public dialogRef: MatDialogRef<FooterComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // @Inject(MAT_DIALOG_DATA) public informe: any,
    // @Inject(MAT_DIALOG_DATA) public productos: any[]
  ) {
  }

  ngOnInit() {
    this.saveFactura();
  }

  saveFactura() {
    let formData: FormData = new FormData();
    formData.append('empresa', this.data.factura.empresa);
    formData.append('fecha', this.data.factura.fecha);
    formData.append('codigo', this.data.factura.codigo);
    formData.append('no_factura', this.data.factura.no_factura);
    formData.append('entregado_por', this.data.factura.entregado_por);
    formData.append('facturado_por', this.data.factura.facturado_por);
    formData.append('entidad_suministradora', this.data.factura.entidad_suministradora);
    formData.append('almacen', this.data.factura.almacen);
    formData.append('importe', this.data.factura.importe);
    this.api.addFactura(formData).subscribe(result => {
      this.progreso = 30;
      this.detalles.push("Factura guardada satisfactoriamente, pasando al informe de recepcion...");
      this.mensaje_progreso = 'Guardando informe de recepción ...';
      this.saveInforme();
    }, error => {
      this.mensaje_progreso = "Ocurrió un error en el proceso de guardado factura, intentelo más tarde";
      this.detalles.push({ message: "Ocurrió un error en el proceso de guardado de la factura...", status: 'error'});
      console.log(error);
    });
  }

  saveInforme() {
    let formData: FormData = new FormData();
    formData.append('no', this.data.informe.no);
    formData.append('empresa', this.data.informe.empresa);
    formData.append('fecha', this.data.informe.fecha);
    formData.append('almacen', this.data.informe.almacen);
    formData.append('codigo', this.data.informe.codigo);
    formData.append('recepcionado_por', this.data.informe.recepcionado_por);
    formData.append('entidad_suminitradora', this.data.factura.entidad_suminitradora);
    formData.append('factura', this.data.informe.factura);
    formData.append('anno', this.data.informe.anno);
    formData.append('no_anno', this.data.informe.no_anno);
    this.api.addInformeRecepcion(formData).subscribe(result => {
      this.progreso = 60;
      let porcentaje = 40 / (this.data.productos.length * 2);
      this.detalles.push({message: "Informe de recepcion guardado satisfactoriamente, pasando a guardar los productos uno a uno...", status: 'success'});
      this.mensaje_progreso = `Guardando productos 0/${this.data.productos.length}...`;
      this.saveProducto(this.data.productos[this.position_prod], this.data.productos.length, porcentaje, this.position_prod + 1);

    }, error => {
      this.mensaje_progreso = "Ocurrió un error en el proceso de guardado informe, intentelo más tarde";
      this.detalles.push({message: "Ocurrió un error en el proceso de guardado del informe, intentelo más tarde", status: 'error'});
      this.detalles.push({message: "Eliminando factura creada", status: 'error'});
      this.api.borrarFacturas(this.data.factura.codigo).subscribe(result=>{
        this.detalles.push({message: "factura eliminada", status: 'error'});
      });
    })
  }

  saveProducto(producto: any, total: number, porcentaje: number, position: number) {
    let formData: FormData = new FormData();
    formData.append('codigo', producto.codigo);
    formData.append('producto_generico', producto.producto_generico);
    formData.append('producto_especifico', producto.producto_especifico);
    formData.append('precio', producto.precio.toString());
    formData.append('precio_unitario', producto.precio_unitario.toString());
    formData.append('descripcion', producto.descripcion);
    console.log(producto);

    if (!producto.codigo_encontrado) {
      this.api.addProducto(formData).subscribe(result => {
        this.mensaje_progreso = `Guardando productos ${position}/${this.data.productos.length}...`;
        this.detalles.push({message: `Producto: ${producto.producto_especifico} guardado satisfactoriamente, pasando a crearle tarjeta estiba...`, status: 'success'});
        this.saveTarjetaEstiba(producto, total, porcentaje);
      }, error => {
        this.mensaje_progreso = "Ocurrió un error en el proceso de guardado producto, intentelo más tarde";
        this.detalles.push({message: "Ocurrió un error en el proceso de guardado del producto, intentelo más tarde", status: 'error'});
        this.position_prod+=1;
        this.saveProducto(this.data.productos[this.position_prod],total, porcentaje, this.position_prod);
      })
    }
    else {
      this.detalles.push({message: `Producto: "${producto.producto_especifico}" ya esta en base de datos, pasando a crearle un historial de tarjeta estiba...`, status: 'success'});
      this.saveHistorialTarjetaEstiba(producto, total, porcentaje);
    }

  }

  saveTarjetaEstiba(producto: Producto, total: number, porcentaje: number) {
    let formData: FormData = new FormData();
    formData.append('codigo', producto.codigo);
    formData.append('producto_generico', producto.producto_generico);
    formData.append('producto_especifico', producto.producto_especifico);
    formData.append('precio_unitario', producto.precio_unitario.toString());
    this.api.addTarjetasEstibas(formData).subscribe(result => {
      this.detalles.push({message: `Tarjeta estiba: "${producto.codigo}"  creada satisfactoriamente, pasando a crearle un historial de tarjeta estiba...`, status: 'success'});
      this.saveHistorialTarjetaEstiba(producto, total, porcentaje)
    }, error => {
      this.mensaje_progreso = "Ocurrió un error en el proceso de guardado tarjeta estiba, intentelo más tarde";
      this.detalles.push({message: "Ocurrió un error en el proceso de guardado de la tarjeta de estiba, intentelo más tarde", status: 'error'});
      console.log(error);
    })
  }

  saveHistorialTarjetaEstiba(producto: Producto, total: number, porcentaje: number) {
    let formData: FormData = new FormData();
    formData.append('fecha', new Date().toString());
    formData.append('clave', 'I/R');
    formData.append('no', this.data.informe.no);
    formData.append('entrada', producto.cantidad.toString());
    formData.append('salida', '-');
    formData.append('codigo_estiba', producto.codigo);
    formData.append('firma', 'SAD');
    console.log('historial tarjeta estiba');

    this.api.addHistorialTarjetasEstibas(formData).subscribe(result => {
      console.log(result);
      this.detalles.push({message: `Historial de tarjeta estiba: "${producto.codigo}" creado satisfactoriamente, pasando a crearle la factura producto...`, status: 'success'});
      this.progreso += porcentaje;
      this.saveFacturaProducto(producto, total, porcentaje);
    }, error => {
      this.mensaje_progreso = "Ocurrió un error en el proceso de guardado historial tarjeta estiba, intentelo más tarde";
      this.detalles.push({message: "Ocurrió un error en el proceso de guardado del historial de la tarjeta de estiba, intentelo más tarde", status: 'error'});
      console.log(error);
    })
  }

  saveFacturaProducto(producto: Producto, total: number, porcentaje: number) {
    console.log(producto, 'entro a savefactura producto');

    let formData: FormData = new FormData();
    formData.append('no_factura', this.data.factura.no_factura);
    formData.append('codigo_producto', producto.codigo);
    formData.append('cantidad', producto.cantidad.toString());
    this.api.addFacturaProducto(formData).subscribe(result => {
      this.progreso += porcentaje;
      this.mensaje_progreso = `Guardando productos ${this.position_prod}/${total}...`;
      this.detalles.push({message:`Factura producto: "${producto.codigo}" creado satisfactoriamente, pasando al siguiente producto...`, status: 'success'});
      this.verificar(porcentaje);
    }, error => {
      this.verificar(porcentaje);
      this.mensaje_progreso = "Ocurrió un error en el proceso de guardado factura producto, intentelo más tarde";
      this.detalles.push({message: "Ocurrió un error en el proceso de guardado de la factura producto, intentelo más tarde", status: 'error'});
      console.log(error);
    });
  }

  verificar(porcentaje: number) {
    this.position_prod += 1;
    if (this.position_prod < this.data.productos.length) {
      this.saveProducto(this.data.productos[this.position_prod], this.data.productos.length, porcentaje, this.position_prod + 1);
    } else {
      this.detalles.push({message:'El proceso termino satisfactoriamente', status: 'success'});
      this.mensaje_progreso = `Todos ha terminado exitosamente...............`;
    }
  }
}

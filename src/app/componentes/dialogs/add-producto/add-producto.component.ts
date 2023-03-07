import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {

  codigo: string = '';
  producto_generico: string = '';
  producto_especifico: string = '';
  descripcion: string = '';
  precio: number = 0;
  precio_unitario: number = 0;
  cantidad: number = 0;

  codigos: Producto[] = [];
  codigos_all: Producto[] = [];
  codigo_encontrado: boolean = false;

  constructor(private storage: SessionStorageService,
    private api: ApiService,
    public dialogRef: MatDialogRef<FooterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.loadProductos();
  }

  disableButton() {
    // console.log('1-',this.codigo == '' );
    // console.log('2-',this.producto_generico == '');
    // console.log('3-',this.producto_especifico == '');
    // console.log('4-',this.descripcion == '');
    // console.log('5-',isNaN(this.precio) );
    // console.log('6-',typeof this.precio_unitario != 'number' || this.precio_unitario < 0);
    // console.log('7-',this.cantidad>0);

    return this.codigo == '' ||
      this.producto_generico == '' ||
      this.producto_especifico == '' ||
      this.descripcion == '' ||
      (typeof this.precio != 'number' || this.precio <= 0) ||
      (typeof this.precio_unitario != 'number' || this.precio_unitario <= 0) ||
      this.cantidad <= 0;
  }

  valid(tipo: string) {
    switch (tipo) {
      case 'precio':
        console.log(typeof this.precio != 'number' || this.precio <= 0);
        return typeof this.precio != 'number' || this.precio <= 0;
      case 'precio_unitario':
        return typeof this.precio_unitario != 'number' || this.precio_unitario <= 0;
      case 'codigo':
        return this.codigo == '';
      case 'producto_generico':
        return this.producto_generico == '';
      case 'producto_especifico':
        return this.producto_especifico == '';
      case 'descripcion':
        return this.descripcion == ''
      case 'cantidad':
        return this.cantidad <= 0;
      default:
        return false;
    }
  }

  loadProductos() {
    this.api.listarProducto().subscribe((result: any) => {
      if (!result.documents) {
        this.codigos_all = result;
        this.codigos = result;
      }
    })
  }

  filtrar() {
    this.codigos = this.codigos_all.filter((e) => e.codigo.toLowerCase().includes(this.codigo.toLowerCase()));
    if (this.codigos.length == 1) {
      this.producto_generico = this.codigos[0].producto_generico;
      this.producto_especifico = this.codigos[0].producto_especifico;
      this.descripcion = this.codigos[0].descripcion;
      this.precio = this.codigos[0].precio;
      this.precio_unitario = this.codigos[0].precio_unitario;
      this.codigo_encontrado = true;
    } else {
      this.codigo_encontrado = false;
    }
  }

  addOrUpdate() {
    let form = new FormData();
    form.append('codigo', this.codigo);
    form.append('producto_generico', this.producto_generico);
    form.append('producto_especifico', this.producto_especifico);
    form.append('descripcion', this.descripcion);
    form.append('precio', this.precio.toString());
    form.append('precio_unitario', this.precio_unitario.toString());
    form.append('cantidad', this.cantidad.toString());
    // if (this.data.accion == 'add') {
    //   this.api.addProducto(form).subscribe((result) => {
    //     this.dialogRef.close(result);
    //   });
    // } else if (this.data.accion == 'update') {
    //   this.api.actualizarProducto(form, this.data.id).subscribe((result) => {
    //     this.dialogRef.close(result);
    //   });
    // } else {
    this.dialogRef.close({
      codigo: this.codigo,
      producto_generico: this.producto_generico,
      producto_especifico: this.producto_especifico,
      descripcion: this.descripcion,
      precio: this.precio,
      precio_unitario: this.precio_unitario,
      cantidad: this.cantidad,
      codigo_encontrado: this.codigo_encontrado,
    });
    // }
  }

}

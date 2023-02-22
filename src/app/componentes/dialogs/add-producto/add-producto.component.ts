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
  precio: string = '';
  precio_unitario: string = '';
  cantidad: string = '';

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
      this.precio = this.codigos[0].precio.toString();
      this.precio_unitario = this.codigos[0].precio_unitario.toString();
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
    form.append('precio', this.precio);
    form.append('precio_unitario', this.precio_unitario);
    form.append('cantidad', this.cantidad);
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

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorageService } from 'ngx-webstorage';
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
  nombre: string = '';
  descripcion: string = '';
  precio: string = '';
  precio_unitario: string = '';
  cantidad: string = '';

  constructor(private storage: SessionStorageService,
    private api: ApiService,
    public dialogRef: MatDialogRef<FooterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addOrUpdate() {
    let form = new FormData();
    form.append('codigo', this.codigo);
    form.append('nombre', this.nombre);
    form.append('descripcion', this.descripcion);
    form.append('precio', this.precio);
    form.append('precio_unitario', this.precio_unitario);
    form.append('cantidad', this.cantidad);
    if (this.data.accion == 'add') {
      this.api.addProducto(form).subscribe((result) => {
        this.dialogRef.close(result);
      });
    } else if(this.data.accion == 'update'){
      this.api.actualizarProducto(form, this.data.id).subscribe((result) => {
        this.dialogRef.close(result);
      });
    }else{
      this.dialogRef.close({
        codigo: this.codigo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        precio_unitario: this.precio_unitario,
        cantidad: this.cantidad,
      });
    }
  }

}

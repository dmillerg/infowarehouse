import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorageService } from 'ngx-webstorage';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css']
})
export class AddFacturaComponent implements OnInit {

  nombre: string = '';
  precio: string = '';
  precio_unitario: string = '';

  constructor(private storage: SessionStorageService,
    private api: ApiService,
    public dialogRef: MatDialogRef<FooterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    @Inject(MAT_DIALOG_DATA) public actualizar: string) {
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addOrUpdate() {
    let form = new FormData();
    form.append('nombre', this.nombre);
    form.append('precio', this.precio);
    form.append('precio_unitario', this.precio_unitario);
    if (this.actualizar == undefined) {
      this.api.addProducto(form).subscribe((result) => {
        this.dialogRef.close(result);
      });
    } else {
      this.api.actualizarProducto(form, this.data.id).subscribe((result) => {
        this.dialogRef.close(result);
      });
    }
  }

}

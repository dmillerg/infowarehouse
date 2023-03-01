import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { Informe } from 'src/app/models/informe';
import { Producto } from 'src/app/models/producto';
import { ApiService } from 'src/app/services/apis/api.service';
import { ProgresSaveFactura } from '../../dialogs/progress-save-factura/progress-save-factura.component';

@Component({
  selector: 'app-add-facturas',
  templateUrl: './add-facturas.component.html',
  styleUrls: ['./add-facturas.component.css']
})
export class AddFacturasComponent implements OnInit {

  @Output() emisor: EventEmitter<any> = new EventEmitter();

  data = {
    empresa: '',
    codigo: '',
    factura: '',
    entregado: '',
    facturado: '',
    entidad: '',
    almacen: '',
    importe: 0,
    no: '',
    no_anno: '',
  }

  productos: any[] = [];


  constructor(private api: ApiService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.api.getLastNumberInformeRecepcion().subscribe(result => {
        this.data.no = result.no;
      console.log(this.data.no);
      
      this.data.no_anno = this.data.no + '-' + new Date().getFullYear();
    })
  }

  add() {
    let factura: Factura = {
      fecha: '',
      empresa: this.data.empresa,
      codigo: this.data.codigo,
      no_factura: this.data.factura,
      entregado_por: this.data.entregado,
      facturado_por: this.data.facturado,
      entidad_suministradora: this.data.entidad,
      almacen: this.data.almacen,
      importe: this.data.importe,
    }

    let informe: Informe = {
      no: this.data.no,
      fecha: new Date(),
      empresa: this.data.empresa,
      almacen: this.data.almacen,
      codigo: this.data.codigo,
      recepcionado_por: this.data.entregado,
      entidad_suministradora: this.data.entidad,
      factura: this.data.factura,
      anno: new Date().getFullYear(),
      no_anno: this.data.no_anno,
    }

    this.dialog.open(ProgresSaveFactura, {
      data: { factura: factura, informe: informe, productos: this.productos }
    })
  }

  disableButton() {
    return this.data.no == '' ||
      this.data.empresa == '' ||
      this.data.almacen == '' ||
      this.data.codigo == '' ||
      this.data.entregado == '' ||
      this.data.entidad == '' ||
      this.data.factura == '' ||
      this.data.facturado == '' ||
      this.data.importe == 0 ||
      this.productos.length == 0;
  }

   action(e: any) {
    console.log(e);
    switch (e) {
      case 'Eliminar':
        // this.selection.selected.forEach((r) => {
        //   this.borrar(r);
        // });
        // console.log("llega hasta aqui")
        // this.toast.success("Se borro correctamente", "Mensaje!!")
        break;
      case 'agregar':
        this.router.navigate(['addfacturas']);
        break;
      case 'Listar':
        // this.table = true;
        // this.addform = false;
        // break;
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-add-facturas',
  templateUrl: './add-facturas.component.html',
  styleUrls: ['./add-facturas.component.css']
})
export class AddFacturasComponent implements OnInit {

  @Output() emisor: EventEmitter<any> = new EventEmitter();
  empresa: string = '';
  codigo: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  addFactura() {
    let formData = new FormData();
    formData.append('empresa', this.empresa);
    formData.append('codigo', this.codigo);
    this.api.addFactura(formData).subscribe((result) => {
      this.emisor.emit('factura creada');
    })
  }
}

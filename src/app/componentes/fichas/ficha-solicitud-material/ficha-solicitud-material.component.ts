import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-ficha-solicitud-material',
  templateUrl: './ficha-solicitud-material.component.html',
  styleUrls: ['./ficha-solicitud-material.component.css']
})
export class FichaSolicitudMaterialComponent implements OnInit {

  @Input() productos: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

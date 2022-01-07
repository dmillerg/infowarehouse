import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() tooltip_add: string = 'Agregar';
  @Input() tooltip_delete: string = 'Actualizar';
  @Input() tooltip_update: string = 'Borrar';
  @Input() tooltip_list: string = 'Listar';

  @Input() tooltip_add_if: boolean = true;
  @Input() tooltip_delete_if: boolean = true;
  @Input() tooltip_update_if: boolean = true;
  @Input() tooltip_list_if: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}

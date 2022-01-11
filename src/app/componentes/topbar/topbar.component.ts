import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() tooltip_add: string = 'Agregar';
  @Input() tooltip_search: string = 'Buscar';
  @Input() tooltip_delete: string = 'Borrar';
  @Input() tooltip_list: string = 'Listar';

  @Input() tooltip_add_if: boolean = true;
  @Input() tooltip_delete_if: boolean = true;
  @Input() tooltip_search_if: boolean = true;
  @Input() tooltip_list_if: boolean = true;

  @Output() emisor: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  action(e: any) {
    this.emisor.emit(e.target.innerText);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() tooltip_add: string = 'Agregar';
  @Input() tooltip_back: string = 'Atras';
  @Input() tooltip_delete: string = 'Borrar';

  @Input() tooltip_add_if: boolean = false;
  @Input() tooltip_back_if: boolean = false;
  @Input() tooltip_delete_if: boolean = false;

  @Input() disable_add: boolean = false;
  @Input() disable_back: boolean = false;
  @Input() disable_delete: boolean = false;

  @Output() emisor: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  action(e: any) {
    this.emisor.emit(e);
  }
}

import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/models/factura';
import { ApiService } from 'src/app/services/apis/api.service';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ transform: 'translateX(50%)', opacity: 0 }), stagger('100ms', animate('1000ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  animations: [
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate('.3s', style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('.3s', style({ transform: 'translateX(50%)', opacity: 0 })),
      ]),
    ]),
  ]
})

export class FacturasComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['select', 'empresa', 'fecha', 'codigo'];
  facturas: Factura[] = [];
  dataSource = new MatTableDataSource<Factura>(this.facturas);
  selection = new SelectionModel<Factura>(true, []);
  loading: boolean = true;
  messageTable: string = '';

  table: boolean = true;
  addform: boolean = false;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log(this.selection.selected);
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Factura): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empresa + 1}`;
  }

  constructor(private api: ApiService, public dialog: MatDialog, private toast: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadFacturas();
  }

  loadFacturas() {
    this.loading = true;
    this.api.listarFacturas().subscribe((result) => {
      if (result.length > 0) {
        this.dataSource = new MatTableDataSource<Factura>(result);
        this.selection = new SelectionModel<Factura>(true, []);
        this.loading = false;
      }
      else {
        this.dataSource = new MatTableDataSource<Factura>([]);
        this.selection = new SelectionModel<Factura>(true, []);
        this.loading = false;
        this.messageTable = 'No hay facturas disponibles';
      }
    }, error => {
      this.loading = false;
      console.log(this.messageTable);
      this.messageTable = error.error;
    });
  }

  ngAfterViewInit(): void {
  }

  borrar(factura: Factura) {
    this.api.borrarFacturas(factura.codigo).subscribe((result) => {
      this.loadFacturas();
    })
  }

  action(e: any) {
    console.log(e);
    switch (e) {
      case 'Eliminar':
        this.selection.selected.forEach((r) => {
          this.borrar(r);
        });
        console.log("llega hasta aqui")
        this.toast.success("Se borro correctamente", "Mensaje!!")
        break;
      case 'agregar':
        this.router.navigate(['addfacturas']);
        break;
      case 'Listar':
        this.table = true;
        this.addform = false;
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

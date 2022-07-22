import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacturasComponent } from './componentes/pages/add-facturas/add-facturas.component';
import { EditFacturaComponent } from './componentes/pages/editar/edit-factura/edit-factura.component';
import { FacturasComponent } from './componentes/pages/facturas/facturas.component';
import { InformeComponent } from './componentes/pages/informe/informe.component';
import { InicioComponent } from './componentes/pages/inicio/inicio.component';
import { TarjetaEstibaComponent } from './componentes/pages/tarjeta-estiba/tarjeta-estiba.component';

const routes: Routes = [
  { path: '', redirectTo: '/facturas', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent},
  { path: 'facturas', component: FacturasComponent},
  { path: 'addfacturas', component: AddFacturasComponent},
  { path: 'informes', component: InformeComponent},
  { path: 'tarjetas', component: TarjetaEstibaComponent},
  { path: 'editfactura', component: EditFacturaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

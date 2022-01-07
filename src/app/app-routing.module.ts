import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './componentes/pages/facturas/facturas.component';
import { InicioComponent } from './componentes/pages/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/facturas', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent},
  { path: 'facturas', component: FacturasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

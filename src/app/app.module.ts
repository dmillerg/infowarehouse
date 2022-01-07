import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FacturasComponent } from './componentes/pages/facturas/facturas.component';
import { InicioComponent } from './componentes/pages/inicio/inicio.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TopbarComponent } from './componentes/topbar/topbar.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './componentes/footer/footer.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 


const materialModules = [
  MatIconModule,
  MatTooltipModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  DragDropModule,
  MatCheckboxModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FacturasComponent,
    InicioComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ...materialModules,
    NgxWebstorageModule.forRoot(),
  ], exports: [
    ...materialModules
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'es'
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
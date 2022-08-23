import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs, 'es');
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
import { DialogFromUsers, FooterComponent } from './componentes/footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AddFacturasComponent } from './componentes/pages/add-facturas/add-facturas.component';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatRippleModule } from '@angular/material/core';
import { AddProductoComponent } from './componentes/dialogs/add-producto/add-producto.component';
import { FacturaComponent } from './componentes/pages/factura/factura.component';
import { InformeComponent } from './componentes/pages/informe/informe.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { FichaInformeComponent } from './componentes/fichas/ficha-informe/ficha-informe.component';
import { FichaFacturaComponent } from './componentes/fichas/ficha-factura/ficha-factura.component';
import { FichaTarjetaEstibaComponent } from './componentes/fichas/ficha-tarjeta-estiba/ficha-tarjeta-estiba.component';
import { TarjetaEstibaComponent } from './componentes/pages/tarjeta-estiba/tarjeta-estiba.component';
import { ToastrModule } from 'ngx-toastr';
import { FichaSolicitudMaterialComponent } from './componentes/fichas/ficha-solicitud-material/ficha-solicitud-material.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgresSaveFactura } from './componentes/dialogs/progress-save-factura/progress-save-factura.component';
import { EditFacturaComponent } from './componentes/pages/editar/edit-factura/edit-factura.component';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
  MatProgressSpinnerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatRippleModule,
  MatListModule,
  MatSidenavModule,
  MatCardModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FacturasComponent,
    InicioComponent,
    TopbarComponent,
    FooterComponent,
    DialogFromUsers,
    AddFacturasComponent,
    AddProductoComponent,
    ProgresSaveFactura,
    FacturaComponent,
    InformeComponent,
    FichaInformeComponent,
    FichaFacturaComponent,
    FichaTarjetaEstibaComponent,
    TarjetaEstibaComponent,
    FichaSolicitudMaterialComponent,
    EditFacturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ...materialModules,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ], exports: [
    ...materialModules
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  },
  {
    provide: LOCALE_ID, useValue: 'es'
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {    return new TranslateHttpLoader(http);}
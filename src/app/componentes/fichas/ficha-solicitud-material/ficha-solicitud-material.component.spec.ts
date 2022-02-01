import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSolicitudMaterialComponent } from './ficha-solicitud-material.component';

describe('FichaSolicitudMaterialComponent', () => {
  let component: FichaSolicitudMaterialComponent;
  let fixture: ComponentFixture<FichaSolicitudMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaSolicitudMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSolicitudMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

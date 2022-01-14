import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTarjetaEstibaComponent } from './ficha-tarjeta-estiba.component';

describe('FichaTarjetaEstibaComponent', () => {
  let component: FichaTarjetaEstibaComponent;
  let fixture: ComponentFixture<FichaTarjetaEstibaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaTarjetaEstibaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaTarjetaEstibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

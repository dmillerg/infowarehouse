import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaEstibaComponent } from './tarjeta-estiba.component';

describe('TarjetaEstibaComponent', () => {
  let component: TarjetaEstibaComponent;
  let fixture: ComponentFixture<TarjetaEstibaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaEstibaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaEstibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

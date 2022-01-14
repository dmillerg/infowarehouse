import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaFacturaComponent } from './ficha-factura.component';

describe('FichaFacturaComponent', () => {
  let component: FichaFacturaComponent;
  let fixture: ComponentFixture<FichaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

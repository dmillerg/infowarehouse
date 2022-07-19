import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresSaveFactura } from './progress-save-factura.component';

describe('ProgresSaveFactura', () => {
  let component: ProgresSaveFactura;
  let fixture: ComponentFixture<ProgresSaveFactura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresSaveFactura ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresSaveFactura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

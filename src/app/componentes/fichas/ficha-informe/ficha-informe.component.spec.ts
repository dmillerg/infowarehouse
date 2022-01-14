import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaInformeComponent } from './ficha-informe.component';

describe('FichaInformeComponent', () => {
  let component: FichaInformeComponent;
  let fixture: ComponentFixture<FichaInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaInformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

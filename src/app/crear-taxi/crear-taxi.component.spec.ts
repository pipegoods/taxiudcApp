import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTaxiComponent } from './crear-taxi.component';

describe('CrearTaxiComponent', () => {
  let component: CrearTaxiComponent;
  let fixture: ComponentFixture<CrearTaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

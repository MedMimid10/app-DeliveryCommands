import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficOrdersComponent } from './trafic-orders.component';

describe('TraficOrdersComponent', () => {
  let component: TraficOrdersComponent;
  let fixture: ComponentFixture<TraficOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraficOrdersComponent]
    });
    fixture = TestBed.createComponent(TraficOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

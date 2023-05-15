import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentOnlineComponent } from './paiment-online.component';

describe('PaimentOnlineComponent', () => {
  let component: PaimentOnlineComponent;
  let fixture: ComponentFixture<PaimentOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaimentOnlineComponent]
    });
    fixture = TestBed.createComponent(PaimentOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

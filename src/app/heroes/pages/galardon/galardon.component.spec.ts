import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalardonComponent } from './galardon.component';

describe('GalardonComponent', () => {
  let component: GalardonComponent;
  let fixture: ComponentFixture<GalardonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalardonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalardonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

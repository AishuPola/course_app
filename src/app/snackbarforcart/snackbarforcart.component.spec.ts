import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarforcartComponent } from './snackbarforcart.component';

describe('SnackbarforcartComponent', () => {
  let component: SnackbarforcartComponent;
  let fixture: ComponentFixture<SnackbarforcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarforcartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarforcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

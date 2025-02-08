import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportemensualPage } from './reportemensual.page';

describe('ReportemensualPage', () => {
  let component: ReportemensualPage;
  let fixture: ComponentFixture<ReportemensualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportemensualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

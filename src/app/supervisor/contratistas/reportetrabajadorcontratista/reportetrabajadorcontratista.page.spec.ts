import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportetrabajadorcontratistaPage } from './reportetrabajadorcontratista.page';

describe('ReportetrabajadorcontratistaPage', () => {
  let component: ReportetrabajadorcontratistaPage;
  let fixture: ComponentFixture<ReportetrabajadorcontratistaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportetrabajadorcontratistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

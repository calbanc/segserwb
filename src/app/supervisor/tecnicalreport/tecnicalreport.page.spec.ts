import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TecnicalreportPage } from './tecnicalreport.page';

describe('TecnicalreportPage', () => {
  let component: TecnicalreportPage;
  let fixture: ComponentFixture<TecnicalreportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TecnicalreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporterondasclientePage } from './reporterondascliente.page';

describe('ReporterondasclientePage', () => {
  let component: ReporterondasclientePage;
  let fixture: ComponentFixture<ReporterondasclientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporterondasclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

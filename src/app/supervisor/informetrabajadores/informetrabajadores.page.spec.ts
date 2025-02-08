import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformetrabajadoresPage } from './informetrabajadores.page';

describe('InformetrabajadoresPage', () => {
  let component: InformetrabajadoresPage;
  let fixture: ComponentFixture<InformetrabajadoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformetrabajadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuardsPage } from './guards.page';

describe('GuardsPage', () => {
  let component: GuardsPage;
  let fixture: ComponentFixture<GuardsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

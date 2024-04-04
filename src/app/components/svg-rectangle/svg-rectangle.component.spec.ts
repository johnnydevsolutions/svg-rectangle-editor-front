import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgRectangleComponent } from './svg-rectangle.component';

describe('SvgRectangleComponent', () => {
  let component: SvgRectangleComponent;
  let fixture: ComponentFixture<SvgRectangleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgRectangleComponent]
    });
    fixture = TestBed.createComponent(SvgRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

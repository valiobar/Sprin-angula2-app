import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReggataAllComponent } from './reggata-all.component';

describe('ReggataAllComponent', () => {
  let component: ReggataAllComponent;
  let fixture: ComponentFixture<ReggataAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReggataAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReggataAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

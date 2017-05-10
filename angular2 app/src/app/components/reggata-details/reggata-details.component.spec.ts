import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReggataDetailsComponent } from './reggata-details.component';

describe('ReggataDetailsComponent', () => {
  let component: ReggataDetailsComponent;
  let fixture: ComponentFixture<ReggataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReggataDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReggataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

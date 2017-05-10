import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReggataComponent } from './reggata.component';

describe('ReggataComponent', () => {
  let component: ReggataComponent;
  let fixture: ComponentFixture<ReggataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReggataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReggataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

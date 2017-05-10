import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReggataCreateComponent } from './reggata-create.component';

describe('ReggataCreateComponent', () => {
  let component: ReggataCreateComponent;
  let fixture: ComponentFixture<ReggataCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReggataCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReggataCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

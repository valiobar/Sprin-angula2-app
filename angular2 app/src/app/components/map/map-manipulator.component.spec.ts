import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapManipulatorComponent } from './map-manipulator.component';

describe('MapManipulatorComponent', () => {
  let component: MapManipulatorComponent;
  let fixture: ComponentFixture<MapManipulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapManipulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapManipulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

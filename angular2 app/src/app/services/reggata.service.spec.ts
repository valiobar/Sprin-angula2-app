import { TestBed, inject } from '@angular/core/testing';

import { ReggataService } from './reggata.service';

describe('ReggataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReggataService]
    });
  });

  it('should ...', inject([ReggataService], (service: ReggataService) => {
    expect(service).toBeTruthy();
  }));
});

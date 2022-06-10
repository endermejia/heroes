import { TestBed } from '@angular/core/testing';

import { NobelService } from './nobel.service';

describe('NobelService', () => {
  let service: NobelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NobelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NewBlockService } from './new-block.service';

describe('NewBlockService', () => {
  let service: NewBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

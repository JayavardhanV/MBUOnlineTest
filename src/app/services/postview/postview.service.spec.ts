import { TestBed } from '@angular/core/testing';

import { PostviewService } from './postview.service';

describe('PostviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostviewService = TestBed.get(PostviewService);
    expect(service).toBeTruthy();
  });
});

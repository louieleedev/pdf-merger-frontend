import { TestBed } from '@angular/core/testing';

import { UnsavedFilesGuard } from './unsaved-files.guard';

describe('UnsavedFilesGuard', () => {
  let guard: UnsavedFilesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedFilesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BackgroundTaskWorkerService } from './background-task-worker.service';

describe('BackgroundTaskWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundTaskWorkerService = TestBed.get(BackgroundTaskWorkerService);
    expect(service).toBeTruthy();
  });
});

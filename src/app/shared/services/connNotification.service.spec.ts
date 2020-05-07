import { TestBed } from '@angular/core/testing';

import { ConnNotificationService } from './connNotification.service';

describe('ConnectionService', () => {
  let service: ConnNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

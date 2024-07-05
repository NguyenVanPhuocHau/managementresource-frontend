import { TestBed } from '@angular/core/testing';

import { ExistingEmailsService } from './existing-emails.service';

describe('ExistingEmailsService', () => {
  let service: ExistingEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistingEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

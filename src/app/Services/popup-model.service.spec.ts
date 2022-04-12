import { TestBed } from '@angular/core/testing';

import { PopupModelService } from './popup-model.service';

describe('PopupModelService', () => {
  let service: PopupModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { ComponentCommunicatorService } from './component-communicator.service';

describe('ComponentCommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentCommunicatorService]
    });
  });

  it('should be created', inject([ComponentCommunicatorService], (service: ComponentCommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});

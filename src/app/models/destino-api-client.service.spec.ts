import { TestBed } from '@angular/core/testing';

import { DestinoApiClientService } from './destino-api-client.service';

describe('DestinoApiClientService', () => {
  let service: DestinoApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinoApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

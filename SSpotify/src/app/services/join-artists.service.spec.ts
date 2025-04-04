import { TestBed } from '@angular/core/testing';

import { JoinArtistsService } from './join-artists.service';

describe('JoinArtistsService', () => {
  let service: JoinArtistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinArtistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

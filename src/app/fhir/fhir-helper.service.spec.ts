import {TestBed, inject} from '@angular/core/testing';
import {FhirHelperService} from './fhir-helper.service';

describe('FhirHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FhirHelperService]
    });
  });

  it('should ...', inject([FhirHelperService], (service: FhirHelperService) => {
    expect(service).toBeTruthy();
  }));
});

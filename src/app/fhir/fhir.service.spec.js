"use strict";
var testing_1 = require('@angular/core/testing');
var fhir_service_1 = require('./fhir.service');
describe('FhirService', function () {
  beforeEach(function () {
    testing_1.TestBed.configureTestingModule({
      providers: [fhir_service_1.FhirService]
    });
  });
  it('should ...', testing_1.inject([fhir_service_1.FhirService], function (service) {
    expect(service).toBeTruthy();
  }));
});

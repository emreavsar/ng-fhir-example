"use strict";
var testing_1 = require('@angular/core/testing');
var fhir_helper_service_1 = require('./fhir-helper.service');
describe('FhirHelperService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [fhir_helper_service_1.FhirHelperService]
        });
    });
    it('should ...', testing_1.inject([fhir_helper_service_1.FhirHelperService], function (service) {
        expect(service).toBeTruthy();
    }));
});

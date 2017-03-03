"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * This service helps to generate FHIR resources.
 * Unfortunately the typings do not include the resourceType.
 *
 * This means by doing:
 * <pre>
 *     const myObservation: fhir.Observation = {
 *        code: { ... some code etc... }
 *     };
 *
 *     console.log(myObservation);
 * </pre>
 *
 * will print only the code, and no inherited attributes like resourceType.
 *
 * Therefore there are helper methods in this class, which fill such fields.
 */
var FhirHelperService = (function () {
    function FhirHelperService() {
    }
    FhirHelperService.prototype.patchObservation = function (observation) {
        console.log('resource to patch:', observation);
        observation.resourceType = "Observation";
        return observation;
    };
    FhirHelperService = __decorate([
        core_1.Injectable()
    ], FhirHelperService);
    return FhirHelperService;
}());
exports.FhirHelperService = FhirHelperService;

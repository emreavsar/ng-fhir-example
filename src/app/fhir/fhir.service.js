"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var fhir_reducer_1 = require('./fhir.reducer');
var core_1 = require('@angular/core');
var FhirClient_1 = require('ng-fhir/FhirClient');
var fhir_domain_1 = require('./model/fhir.domain');
var FhirService = (function () {
    function FhirService(store, helper) {
        this.store = store;
        this.helper = helper;
        this.config = {
            'baseUrl': 'http://fhirtest.uhn.ca/baseDstu2',
            'credentials': 'same-origin',
        };
        this.client = new FhirClient_1.FhirClient(this.config);
    }
    FhirService.prototype.getConformance = function () {
        var _this = this;
        this.client.conformance({}).then(function (response) {
            if (response.data) {
                var conformance = (response.data || []);
                _this.store.dispatch({ type: fhir_reducer_1.CONFORMANCE_LOAD_SUCCES, payload: conformance });
                console.log('conformance loaded: ', conformance);
            }
        }, function (err) {
            console.log(err);
        });
    };
    FhirService.prototype.loadHistory = function () {
        var _this = this;
        this.client.history({}).then(function (response) {
            if (response.data) {
                var history_1 = (response.data || []);
                _this.store.dispatch({ type: fhir_reducer_1.HISTORY_LOAD_SUCCESS, payload: history_1 });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FhirService.prototype.createObservation = function () {
        var _this = this;
        console.log('going to create an observation');
        var observation = this.helper.patchObservation({
            status: 'final',
            code: {
                coding: [{
                        system: "http://loinc.org",
                        code: "75281-6",
                        display: "Personal belief"
                    }]
            }
        });
        var obsByClass = new fhir_domain_1.Observation();
        obsByClass.status = 'final';
        console.log(obsByClass);
        var theResource = {
            resource: observation
        };
        this.client.create(theResource).then(function (response) {
            console.log('response from backend: ', response);
            _this.store.dispatch({ type: fhir_reducer_1.PATIENT_CREATE_SUCCESS, payload: response });
        }, function (err) {
            console.log(err);
        });
    };
    FhirService.prototype.loadResourceHistory = function () {
        var _this = this;
        this.client.resourceHistory({ type: 'Patient', id: '1707' }).then(function (response) {
            if (response.data) {
                var resourceHistory = (response || []);
                _this.store.dispatch({ type: fhir_reducer_1.PATIENT_HISTORY_LOAD_SUCCESS, payload: resourceHistory });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FhirService.prototype.searchPatient = function () {
        var _this = this;
        this.client.search({ type: 'Patient', query: {} }).then(function (response) {
            if (response.data) {
                var patientSearchResult = (response.data || []);
                _this.store.dispatch({ type: fhir_reducer_1.PATIENTS_SEARCH_SUCCESS, payload: patientSearchResult });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FhirService.prototype.readCondition = function () {
        var _this = this;
        this.client.read({ type: 'Condition', id: "2293" }).then(function (response) {
            if (response.data) {
                var condition = (response.data || {});
                _this.store.dispatch({ type: fhir_reducer_1.CONDITION_READ_SUCCESS, payload: condition });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FhirService = __decorate([
        core_1.Injectable()
    ], FhirService);
    return FhirService;
}());
exports.FhirService = FhirService;

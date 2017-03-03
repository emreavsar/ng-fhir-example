"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(fhirService, store) {
        var _this = this;
        this.fhirService = fhirService;
        this.store = store;
        this.config = {
            'baseUrl': 'http://fhirtest.uhn.ca/baseDstu2',
            'credentials': 'same-origin',
        };
        this.conformance = {};
        this.history = {};
        this.resourceHistory = {};
        this.patients = [];
        this.condition = {};
        this.createResponse = {};
        store.select('fhir').subscribe(function (appState) {
            console.log('store got an update, update data in component. new state:', appState);
            _this.conformance = appState.conformance;
            _this.createResponse = appState.createResponse;
            _this.history = appState.history;
            _this.resourceHistory = appState.resourceHistory;
            _this.patients = appState.patients;
            _this.condition = appState.condition;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.fhirService.getConformance();
        this.fhirService.loadHistory();
        this.fhirService.loadResourceHistory();
        this.fhirService.searchPatient();
        this.fhirService.readCondition();
    };
    AppComponent.prototype.createObservation = function () {
        this.fhirService.createObservation();
    };
    AppComponent.prototype.stringify = function (obj) {
        return JSON.stringify(obj, null, '  ');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

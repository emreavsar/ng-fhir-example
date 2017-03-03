import {FhirState} from './fhir/fhir.reducer';
import {FhirService} from './fhir/fhir.service';
import {OnInit} from '@angular/cli/node_modules/@angular/core';
import {Component} from '@angular/core';
import {FhirClient} from 'ng-fhir/FhirClient';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private client: FhirClient;

  private config: any = {
    'baseUrl': 'http://fhirtest.uhn.ca/baseDstu2',
    'credentials': 'same-origin',
  };

  public conformance: any = {};
  public history: fhir.Bundle = {};
  public resourceHistory: fhir.Bundle = {};
  public patients: fhir.Patient[] = [];
  public condition: fhir.Condition = {};
  public createResponse: fhir.OperationOutcome = {};


  constructor(private fhirService: FhirService, private store: Store<FhirState>) {
    store.select<FhirState>('fhir').subscribe((appState) => {
      console.log('store got an update, update data in component. new state:', appState);
      this.conformance = appState.conformance;
      this.createResponse = appState.createResponse;
      this.history = appState.history;
      this.resourceHistory = appState.resourceHistory;
      this.patients = appState.patients;
      this.condition = appState.condition;
    });
  }

  ngOnInit() {
    this.fhirService.getConformance();
    this.fhirService.loadHistory();
    this.fhirService.loadResourceHistory();
    this.fhirService.searchPatient();
    this.fhirService.readCondition();
  }

  createObservation() {
    this.fhirService.createObservation();
  }

  stringify(obj: any): string {
    return JSON.stringify(obj, null, '  ');
  }
}

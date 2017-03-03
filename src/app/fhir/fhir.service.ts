import {
  AppState,
  CONFORMANCE_LOAD_SUCCES,
  PATIENT_CREATE_SUCCESS,
  HISTORY_LOAD_SUCCESS,
  PATIENT_HISTORY_LOAD_SUCCESS,
  PATIENTS_SEARCH_SUCCESS,
  CONDITION_READ_SUCCESS
} from './fhir.reducer';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {FhirClient} from 'ng-fhir/FhirClient';
import {FhirHelperService} from './fhir-helper.service';
import {Observation} from './model/fhir.domain';

@Injectable()
export class FhirService {

  private client: FhirClient;

  private config: any = {
    'baseUrl': 'http://fhirtest.uhn.ca/baseDstu2',
    'credentials': 'same-origin',
  };

  constructor(private store: Store<AppState>, private helper: FhirHelperService) {
    this.client = new FhirClient(this.config);
  }

  public getConformance() {
    this.client.conformance({}).then((response) => {
      if (response.data) {
        const conformance = (response.data || []);
        this.store.dispatch({type: CONFORMANCE_LOAD_SUCCES, payload: conformance});
        console.log('conformance loaded: ', conformance);
      }
    }, (err) => {
      console.log(err);
    });
  }

  public loadHistory() {
    this.client.history({}).then((response) => {
      if (response.data) {
        const history: fhir.Bundle = (response.data || []);
        this.store.dispatch({type: HISTORY_LOAD_SUCCESS, payload: history});
      }
    }, (err) => {
      console.log(err);
    });
  }

  public createObservation() {
    console.log('going to create an observation');

    const observation = this.helper.patchObservation({
      status: 'final',
      code: {
        coding: [{
          system: "http://loinc.org",
          code: "75281-6",
          display: "Personal belief"
        }]
      }
    });

    const obsByClass: fhir.Observation = new Observation();
    obsByClass.status = 'final';
    console.log(obsByClass);

    const theResource = {
      resource: observation
    };

    this.client.create(theResource).then((response) => {
      console.log('response from backend: ', response);
      this.store.dispatch({type: PATIENT_CREATE_SUCCESS, payload: response});
    }, (err) => {
      console.log(err);
    });
  }

  public loadResourceHistory() {
    this.client.resourceHistory({type: 'Patient', id: '1707'}).then((response) => {
      if (response.data) {
        const resourceHistory: fhir.Bundle = (response || []);
        this.store.dispatch({type: PATIENT_HISTORY_LOAD_SUCCESS, payload: resourceHistory});
      }
    }, (err) => {
      console.log(err);
    });
  }

  public searchPatient() {
    this.client.search({type: 'Patient', query: {}}).then((response) => {
      if (response.data) {
        const patientSearchResult: fhir.Bundle = (response.data || []);
        this.store.dispatch({type: PATIENTS_SEARCH_SUCCESS, payload: patientSearchResult});
      }
    }, (err) => {
      console.log(err);
    });
  }

  public readCondition() {
    this.client.read({type: 'Condition', id: "2293"}).then((response) => {
      if (response.data) {
        const condition: fhir.Condition = (response.data || {});
        this.store.dispatch({type: CONDITION_READ_SUCCESS, payload: condition});
      }
    }, (err) => {
      console.log(err);
    });
  }
}


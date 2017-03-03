import {FhirState} from './fhir.reducer';
import {Action} from '@ngrx/store';

export const CONFORMANCE_LOAD_SUCCES = 'CONFORMANCE_LOAD_SUCCES';
export const PATIENT_CREATE_SUCCESS = 'PATIENT_CREATE_SUCCESS';
export const HISTORY_LOAD_SUCCESS = 'HISTORY_LOAD_SUCCESS';
export const PATIENT_HISTORY_LOAD_SUCCESS = 'PATIENT_HISTORY_LOAD_SUCCESS';
export const PATIENTS_SEARCH_SUCCESS = 'PATIENTS_SEARCH_SUCCESS';
export const CONDITION_READ_SUCCESS = 'CONDITION_READ_SUCCESS';


export interface AppState {
  fhir: FhirState;
}

export interface FhirState {
  conformance: any;
  history: fhir.Bundle;
  resourceHistory: fhir.Bundle;
  patients: fhir.Patient[];
  condition: fhir.Condition;
  createResponse: fhir.OperationOutcome;
}

export const initialState: FhirState = {
  conformance: null,
  history: null,
  resourceHistory: null,
  patients: null,
  condition: null,
  createResponse: null
};

export function fhirReducer(state: FhirState = initialState, action: Action) {
  switch (action.type) {
    case CONFORMANCE_LOAD_SUCCES:
      console.log('Conformance loaded, payload: ', action.payload);
      return Object.assign({}, state, {
        conformance: action.payload
      });
    case PATIENT_CREATE_SUCCESS:
      console.log('Patient created: ', action.payload);
      return Object.assign({}, state, {
        createResponse: action.payload.data
      });
    case HISTORY_LOAD_SUCCESS:
      console.log('History loaded: ', action.payload);
      return Object.assign({}, state, {
        history: action.payload
      });
    case PATIENT_HISTORY_LOAD_SUCCESS:
      console.log('Resource history loaded: ', action.payload);
      return Object.assign({}, state, {
        resourceHistory: action.payload.data
      });
    case PATIENTS_SEARCH_SUCCESS:
      console.log('Search patients loaded: ', action.payload);
      var extractedResources: fhir.Patient[];
      if (action.payload.entry) {
        extractedResources = action.payload.entry.map((entry) => {
          return entry.resource
        });
      }
      return Object.assign({}, state, {
        patients: extractedResources
      });
    case CONDITION_READ_SUCCESS:
      console.log('Condition loaded: ', action.payload);
      return Object.assign({}, state, {
        condition: action.payload
      });
    default:
      return state;
  }
}

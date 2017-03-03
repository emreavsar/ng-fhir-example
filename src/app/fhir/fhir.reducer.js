"use strict";
exports.CONFORMANCE_LOAD_SUCCES = 'CONFORMANCE_LOAD_SUCCES';
exports.PATIENT_CREATE_SUCCESS = 'PATIENT_CREATE_SUCCESS';
exports.HISTORY_LOAD_SUCCESS = 'HISTORY_LOAD_SUCCESS';
exports.PATIENT_HISTORY_LOAD_SUCCESS = 'PATIENT_HISTORY_LOAD_SUCCESS';
exports.PATIENTS_SEARCH_SUCCESS = 'PATIENTS_SEARCH_SUCCESS';
exports.CONDITION_READ_SUCCESS = 'CONDITION_READ_SUCCESS';
exports.initialState = {
    conformance: null,
    history: null,
    resourceHistory: null,
    patients: null,
    condition: null,
    createResponse: null
};
function fhirReducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case exports.CONFORMANCE_LOAD_SUCCES:
            console.log('Conformance loaded, payload: ', action.payload);
            return Object.assign({}, state, {
                conformance: action.payload
            });
        case exports.PATIENT_CREATE_SUCCESS:
            console.log('Patient created: ', action.payload);
            return Object.assign({}, state, {
                createResponse: action.payload.data
            });
        case exports.HISTORY_LOAD_SUCCESS:
            console.log('History loaded: ', action.payload);
            return Object.assign({}, state, {
                history: action.payload
            });
        case exports.PATIENT_HISTORY_LOAD_SUCCESS:
            console.log('Resource history loaded: ', action.payload);
            return Object.assign({}, state, {
                resourceHistory: action.payload.data
            });
        case exports.PATIENTS_SEARCH_SUCCESS:
            console.log('Search patients loaded: ', action.payload);
            var extractedResources;
            if (action.payload.entry) {
                extractedResources = action.payload.entry.map(function (entry) {
                    return entry.resource;
                });
            }
            return Object.assign({}, state, {
                patients: extractedResources
            });
        case exports.CONDITION_READ_SUCCESS:
            console.log('Condition loaded: ', action.payload);
            return Object.assign({}, state, {
                condition: action.payload
            });
        default:
            return state;
    }
}
exports.fhirReducer = fhirReducer;

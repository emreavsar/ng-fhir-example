import {Injectable} from '@angular/core';

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
@Injectable()
export class FhirHelperService {

  constructor() {
  }

  public patchObservation(observation: fhir.Observation): fhir.Observation {
    console.log('resource to patch:', observation);
    observation.resourceType = "Observation";
    return observation;
  }

}

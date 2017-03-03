/* **********************************************************************
 * ng-fhir-example-master
 *
 * Copyright (c) 2017
 * Arpage AG, CH - 8700 Kuesnacht ZH
 * All rights reserved
 * **********************************************************************
 */
/**
 * Wrap all used fhir typing interfaces to classes.
 * @author emre
 * @since Mar 02, 2017 17:19:12
 */

export class Observation implements fhir.Observation {
  resourceType: string;

  constructor() {
    this.resourceType = this.constructor.name;
  }
}

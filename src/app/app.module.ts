import {fhirReducer} from './fhir/fhir.reducer';
import {FhirService} from './fhir/fhir.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppComponent} from './app.component';
import {FhirHelperService} from './fhir/fhir-helper.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({fhir: fhirReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [
    FhirService,
    FhirHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinoApiClient } from './models/destino-api-client.service'
import { DestinoViajeEffects, DestinoViajeState, initializeDestinoViajesState, reducerDestinoViajes } from './models/destinos-viajes-states.model';
import { ActionReducerMap,  } from '@ngrx/store';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export interface AppState{
  destinos: DestinoViajeState;
}

const reducers: ActionReducerMap<AppState>={
  destinos: reducerDestinoViajes
}

let reducersInitialState = {
  destinos: initializeDestinoViajesState()
}
@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinoViajeEffects])
  ],
  providers: [DestinoApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

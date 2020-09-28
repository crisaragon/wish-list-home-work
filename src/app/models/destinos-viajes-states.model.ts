import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store/src';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.models';

export interface DestinoViajeState{
  items:DestinoViaje [];
  loading: boolean;
  favorito: DestinoViaje;
}

export const initializeDestinoViajesState = () =>{
  return {
    items: [],
    loading:false,
    favorito: null
  }
}

export enum DestinoViajesActionTypes{
  NUEVO_DESTINO = '[Destinos viajes] nuevo',
  ELEGIDO_FAVORITO = '[Destinos viajes] favorito',
}

export class NuevoDestinoAction implements Action{
  type = DestinoViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje){}
}

export class ElegidoFavoritoAction implements Action{
  type = DestinoViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje){}
}

export type DestinoviajesActions = NuevoDestinoAction | ElegidoFavoritoAction;

export function reducerDestinoViajes(state: DestinoViajeState, action: DestinoviajesActions): DestinoViajeState {
  switch(action.type){
    case DestinoViajesActionTypes.NUEVO_DESTINO :{
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      }
    }
    case DestinoViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach(x => x.setSelected(false));
      const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino
      return { ...state, favorito: fav }
    }
    return state;
  }
}

@Injectable()
export class DestinoViajeEffects{
  @Effect() nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinoViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  )

  constructor(private actions$: Actions){}

}

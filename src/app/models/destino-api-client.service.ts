import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.models';

@Injectable({
  providedIn: 'root'
})
export class DestinoApiClient {

  private destinos:DestinoViaje[]
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
   }

  add(destino: DestinoViaje) {
    this.destinos.push(destino)
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: string):DestinoViaje{
    return this.destinos.filter(destino => destino.id.toString() == id)[0];
  }

  elegir(destino: DestinoViaje){
    this.destinos.forEach(dest => dest.setSelected(false));
    destino.setSelected(true);
    this.current.next(destino);
  }

  suscribeOnChange(fn){
    this.current.subscribe(fn);
  }
}

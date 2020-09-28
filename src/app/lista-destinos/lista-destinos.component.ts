import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoApiClient } from '../models/destino-api-client.service';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {

  @Output('onItemAdded') onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(public destinosApiClient: DestinoApiClient ) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.suscribeOnChange((destino: DestinoViaje) => {
      if(destino != null){
        this.updates.push(`Se ha elegido ${destino.nombre}`);
      }
    })
   }

  ngOnInit(): void {
  }

  agregado(destino: DestinoViaje): boolean{
    this.destinosApiClient.add(destino)
    this.onItemAdded.emit(destino);
    return false;
  }

  elegido(destino: DestinoViaje){
    this.destinosApiClient.elegir(destino);
  }
}

import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {

  public destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
   }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean{
    let destinoViaje = new DestinoViaje(nombre, url);
    this.destinos.push(destinoViaje);
    return false;
  }
}

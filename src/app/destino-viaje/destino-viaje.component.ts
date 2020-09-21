import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {
  @Input('destino') destino:DestinoViaje;
  @HostBinding('attr.class') clase = 'col-md-4 mb-3 '
  constructor() {
  }

  ngOnInit(): void {
  }

}

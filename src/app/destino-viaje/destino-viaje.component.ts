import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {
  @Input('idx') position: number;
  @Input('destino') destino:DestinoViaje;
  @HostBinding('attr.class') clase = 'col-md-4 mb-3 '
  @Output('clicked') clicked:EventEmitter<DestinoViaje>;
  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

}

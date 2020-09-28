import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ajax } from "rxjs/ajax";
import { fromEvent } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {

  public fg: FormGroup;
  public minLongitud: number = 3 ;
  public searchResults: string[];
  @Output('onItemAdded') onItemAdded: EventEmitter<DestinoViaje>;

  constructor(private fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([Validators.required, this.nombreValidador.bind(this), this.nombreValidatorParametrizable(5) ])],
      url:['', [Validators.required]],
    });
    this.fg.valueChanges.subscribe((form: any) => console.log('Cambio el formulario', form ))
  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => ajax('/assets/datos.json'))
    )
    .subscribe(ajaxResponse => {
      this.searchResults = ajaxResponse.response
    })
  }

  guardar(nombre: string, url: string): boolean{
    const destino = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(destino);
    return false;
  }

  nombreValidador(control: FormControl): {[key: string]: boolean}{
    const l = control.value.toString().trim().length;
    if (l > 0 && l < this.minLongitud){
      console.log(l);
      return {invalidNombre: true}
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number):ValidatorFn{
    return (control: FormControl): {[key: string]: boolean | null} => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        console.log(l);
        return { minLongNombre: true }
      }
      return null;
    }
  }
}

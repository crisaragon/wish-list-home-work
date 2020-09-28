export class DestinoViaje{

  private selected: boolean;
  public servicios: string[];
  id: number;

  constructor(public nombre: string, public imagenUrl: string) {
    this.servicios = ['Pileta', 'Desayuno']
  }

  isSelected(){
    return this.selected;
  }
  setSelected(valor : boolean){
    this.selected = valor;
  }
}

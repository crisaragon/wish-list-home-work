export class DestinoViaje{
  public nombre: string;
  public imagenUrl: string;
  public Resenas: string[];
  /**
   *
   */
  constructor(nombre: string, imagenUrl: string) {
    this.nombre = nombre;
    this.imagenUrl = imagenUrl;
  }
}

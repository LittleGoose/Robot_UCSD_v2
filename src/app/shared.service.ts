import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  // Variable para almacenar la posición de desplazamiento
  private scrollPosition: number = 0;

  // Método para obtener la posición de desplazamiento
  getScrollPosition(): number {
    return this.scrollPosition;
  }

  // Método para actualizar la posición de desplazamiento
  setScrollPosition(position: number): void {
    this.scrollPosition = position;
  }

  constructor() { }
}

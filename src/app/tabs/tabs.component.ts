import { AppComponent } from './../app.component';
import { Component, OnInit,  Input  } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  @Output() removeTabEvent = new EventEmitter<void>();

  constructor(private AppComponent: AppComponent) { }

  ngOnInit() {}


  eliminarBoton() {
    console.log("tab clickeado")
    this.removeTabEvent.emit();
    // Encuentra el índice del botón en el arreglo que deseas eliminar
    //const index = this.buttons.findIndex((boton) => boton.label === 'Botón');
    
    // Si se encuentra, elimina el botón
    //if (index !== -1) {
      //this.buttons.splice(index, 1);
    //}
  }
  
  

}

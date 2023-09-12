import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollService } from '../shared.service';

@Component({
  selector: 'app-sidebar-first',
  templateUrl: './sidebar-first.component.html',
  styleUrls: ['./sidebar-first.component.scss'],
})
export class SidebarFirstComponent  implements OnInit {
  @ViewChild(IonContent) content!: IonContent ;

  rootPage1 = 'Panel1Page';

  //Esta parte hace referencia al Scroll con el SERVICIO COMPARTIDO
  constructor(public scrollService: ScrollService) {}

   public scrollToComponentB(): void {
    // Calcula la posición de desplazamiento que desees
    const scrollPosition = 50; // Cambia esto según tus necesidades

    // Actualiza la posición de desplazamiento en el servicio
    this.scrollService.setScrollPosition(scrollPosition);
  }

  ngOnInit() {}
  

  funcionalidad_1(){
    
  }
  funcionalidad(){}

   scrollToPosition() {
      // Aquí especifica la posición a la que deseas hacer scroll
      const positionX = 0;
      const positionY = 500; // Cambia esta coordenada según tus necesidades
  
      this.content.scrollToPoint(positionX, positionY, 1000); // El tercer argumento es la duración en milisegundos
    }
   }

  

  

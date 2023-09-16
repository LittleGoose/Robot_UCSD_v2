import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-sidebar-first',
  templateUrl: './sidebar-first.component.html',
  styleUrls: ['./sidebar-first.component.scss'],
})
export class SidebarFirstComponent  implements OnInit {
  @ViewChild(IonContent) content: IonContent ;

  constructor(private scrollService: ScrollService) {}
 
  buttonClick(event: Event) {
    const buttonId = (event.target as HTMLElement).getAttribute('data-button-id');
    //TODO: Al llamar a sendInformation(), el 2do parametro debe calcularse dinamicamente segundo el 
    //numero de elementos en el scrollbar
    console.log("Ejecutando evento buttonClick")
    if (buttonId === 'btnFacialExp') {
      console.log("Se hizo clic en el btnFacialExp")
      this.scrollService.sendInformation(0, 0);
    } else if (buttonId === 'btnBodyGest') {
      console.log("Se hizo clic en el btnBodyGest")
      this.scrollService.sendInformation(0, 50);
    }
    else if (buttonId === 'btnToneVoice') {
      console.log("Se hizo clic en el btnToneVoice")
      this.scrollService.sendInformation(0, 100);
    }
    else if (buttonId === 'btnSpeech') {
      console.log("Se hizo clic en el btnSpeech")
      this.scrollService.sendInformation(0, 150);
    }
    else if (buttonId === 'btnRoutines') {
      console.log("Se hizo clic en el btnRoutines")
      this.scrollService.sendInformation(0, 200);
    }
  }

  onClickScroll() {
    const positionX = 0; // Posición horizontal (ajusta según tus necesidades)
    const positionY = 200; // Posición vertical (ajusta según tus necesidades)
    
    console.log(positionX, positionY);
    this.scrollService.sendInformation(positionX, positionY);

    //this.scrollService.scrollToPosition(this.content, 0 ,500);
  }

  funcionalidad_2()
  {
    const positionX = 0; // Posición horizontal (ajusta según tus necesidades)
    const positionY = 800; // Posición vertical (ajusta según tus necesidades)
    
    console.log(positionX, positionY);
    this.scrollService.sendInformation(positionX, positionY);

  }


  
  rootPage1 = 'Panel1Page';
  rootPage2 = 'Panel2Page';
  rootPage3 = 'Panel3Page';


  

   //public scrollToComponentB(): void {
    // Calcula la posición de desplazamiento que desees
    //const scrollPosition = 50; // Cambia esto según tus necesidades

    // Actualiza la posición de desplazamiento en el servicio
    //this.scrollService.setScrollPosition(scrollPosition);
  //}

  ngOnInit() {}
  

  funcionalidad_1(){
    
  }
  funcionalidad(){}

   
   }

  

  

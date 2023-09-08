import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {

  name: string = "";

  constructor(private modalController: ModalController){ }

  cancel() {
    console.log("Exiting Pop Up");
    this.modalController.dismiss(null, 'cancel');
  }

  pinFormatter(value: number) {

    let level : string = "";

    switch(value) { 
      case 0: { 
         level = "Low";
         break; 
      } 
      case 1: { 
        level = "Medium";
         break; 
      } 
      case 2: { 
        level = "High";
        break; 
     } 
      default: { 
         break; 
      } 
   } 
    return level;
  }

}

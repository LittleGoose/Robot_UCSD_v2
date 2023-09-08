import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {

  @ViewChild(IonModal) modal: IonModal;

  name: string = "";

  constructor(private modalController: ModalController){ }

  cancel() {
    console.log("Exiting Pop Up");
    this.modalController.dismiss(null, 'cancel');
  }

}

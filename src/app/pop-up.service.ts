import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpComponent } from './pop-up/pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: PopUpComponent,
    });

    await modal.present();
  }
}

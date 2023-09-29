import { EventEmitter, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpSaveComponent } from './pop-up-save/pop-up-save.component';
import { Send_block } from './models/routines.model';
import { PopUpClearComponent } from './pop-up-clear/pop-up-clear.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  blockUpdated: EventEmitter<Send_block> = new EventEmitter<Send_block>();
  saveRoutine: EventEmitter<string> = new EventEmitter<string>();
  clearRoutine: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalController: ModalController) {}

  async openModal(block: Send_block) {

    const modal = await this.modalController.create({
      component: PopUpComponent,
      componentProps: {
        block: block // Pass the block as a parameter to the modal
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'dataSaved') {
        this.blockUpdated.emit(result.data);
      }
    });

    await modal.present();
  }

  async openModal_Save() {

    const modal = await this.modalController.create({
      component: PopUpSaveComponent
    });

    modal.onDidDismiss().then((result) => {
    });

    await modal.present();
  }

  async openModal_Clear() {

    const modal = await this.modalController.create({
      component: PopUpClearComponent,
      componentProps: {
        text: "Hello" // Pass the block as a parameter to the modal
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'Yes') {
        this.clearRoutine.emit(result.data);
      }
    });

    await modal.present();
  }

}

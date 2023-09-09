import { EventEmitter, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BlockComponentComponent } from './block-component/block-component.component';

import { Send_block } from './models/routines.model';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  blockUpdated: EventEmitter<Send_block> = new EventEmitter<Send_block>();

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

}

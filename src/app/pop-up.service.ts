import { EventEmitter, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpSaveComponent } from './pop-up-save/pop-up-save.component';
import { Send_block } from './models/routines.model';
import { PopUpClearComponent } from './pop-up-clear/pop-up-clear.component';
import { Block, Routines_Blocks } from './models/blocks.model';
import { SendData } from './new-block.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  blockUpdated: EventEmitter<Send_block> = new EventEmitter<Send_block>();
  saveRoutine: EventEmitter<string> = new EventEmitter<string>();
  clearRoutine: EventEmitter<string> = new EventEmitter<string>();
  saveRoutineEvent: EventEmitter<SendDataRoutine> = new EventEmitter<SendDataRoutine>();
  send_data: SendData = new SendData();
  send_data_routine: SendDataRoutine = new SendDataRoutine();

  constructor(private modalController: ModalController) {} //private rs: RestService 

   // TODO llamar al post del restservice para mandar la routine
  save_button(type_def: string, routine?: Routines_Blocks){
    this.send_data_routine.type_def = type_def;
    if(routine){
      this.send_data_routine.routine = routine;

      /*this.rs.upload_routine(routine).subscribe(
        (response) => {
          console.log(response);
          console.log(routine);
        },
        (error) => {
          console.log(error);
        }
      );*/

    }
    this.saveRoutineEvent.emit(this.send_data_routine);
  }

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
      if (result.role === 'Yes') {
        this.save_button(result.role)
      }
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

export class SendDataRoutine{
  type_def: string;
  routine: Routines_Blocks;
}

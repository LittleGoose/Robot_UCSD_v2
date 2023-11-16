import { EventEmitter, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpSaveComponent } from './pop-up-save/pop-up-save.component';
import { Routines, Send_block } from './models/routines.model';
import { PopUpClearComponent } from './pop-up-clear/pop-up-clear.component';
import { Block, Routines_Blocks } from './models/blocks.model';
import { SendData } from './new-block.service';
import { RestService } from './rest.service';
import { PopUpNameDuplicateComponent } from './pop-up-name-duplicate/pop-up-name-duplicate.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  blockUpdated: EventEmitter<Send_block> = new EventEmitter<Send_block>();
  NameRoutine: EventEmitter<string> = new EventEmitter<string>();
  NameRoutine_Send: EventEmitter<string> = new EventEmitter<string>();
  saveRoutine: EventEmitter<SendDataRoutine> = new EventEmitter<SendDataRoutine>();
  clearRoutine: EventEmitter<string> = new EventEmitter<string>();
  saveRoutineEvent: EventEmitter<SendDataRoutine> = new EventEmitter<SendDataRoutine>();
  retrieve_past_routine: EventEmitter<Routines> = new EventEmitter<Routines>();
  retrieve_current_routine: EventEmitter<Routines> = new EventEmitter<Routines>();
  save_current_routine: EventEmitter<string> = new EventEmitter<string>();
  delete_tab: EventEmitter<number> = new EventEmitter<number>();
  replaceRoutineEvent: EventEmitter<Number> = new EventEmitter<Number>();
  store_current_routine: EventEmitter<Routines> = new EventEmitter<Routines>();

  send_data: SendData = new SendData();
  send_data_routine: SendDataRoutine = new SendDataRoutine();

  current_routine: Routines = new Routines();

  constructor(private modalController: ModalController) {} //private rs: RestService

  save_button(send_data: SendDataRoutine, routine?: Routines){
    if(routine){
      this.send_data_routine.routine = routine;
      this.send_data_routine.routine.name = send_data.name;
      this.send_data_routine.type_def = "Show_Routine";
      this.saveRoutineEvent.emit(this.send_data_routine);
    } else { // Receives instruction
      this.send_data_routine.name = send_data.name;
      this.send_data_routine.type_def = send_data.type_def;
      this.saveRoutineEvent.emit(this.send_data_routine);
    }
    
  }

  async openDuplicateModal(routine_name){

    const modal = await this.modalController.create({
      component: PopUpNameDuplicateComponent,
      componentProps: {
        routine_name : routine_name
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data === 1) {
        this.replaceRoutineEvent.emit(result.data);
      }
    });

    await modal.present();
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

  async openModal_Save(name_routine?:string) { 

    const modal = await this.modalController.create({ // Create save pop-up
      component: PopUpSaveComponent,
      componentProps: {
        name: name_routine // Sends name in case there is one
      }
    });

    modal.onDidDismiss().then((result) => { // Once is closed
      if (result.role !== 'cancel' && result.role !== 'backdrop') { // If accepted
        const start_data = new SendDataRoutine();
        start_data.name = result.role
        start_data.type_def = "Send_Name_Please"

        this.save_button(start_data)
      }
    });

    await modal.present();
  }

  async openModal_Clear(dataExtra?: string, tab_borrar?:number) {

    console.log("data extra:" + `${dataExtra}`)
    const modal = await this.modalController.create({
      component: PopUpClearComponent,
      componentProps: {
        text: "Hello" // Pass the block as a parameter to the modal
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'Yes') {
        this.clearRoutine.emit(dataExtra);
        if(tab_borrar != undefined){
          console.log("Emit de tab", tab_borrar);
          this.delete_tab.emit(tab_borrar);
        }
      }
      
    });

    await modal.present();
  }

  ask_name(type:string, routine?:Routines){
    if(type == "ask"){
      this.NameRoutine.emit(type); // Ask name to show on the pop-up
    } else {
      this.openModal_Save(routine.name); // Opens the modal
    }
  }

  push_routine(routine: Routines){
    // Only when starting the app
    this.retrieve_past_routine.emit(routine);
  }

  retrieve_routine(action:string, routine?: Routines){
    if(action=="store"){
      // When changing the view
      this.current_routine = routine;     
    } else if(action == "get"){
      this.retrieve_current_routine.emit(this.current_routine);
    } else if(action == "save_routine"){
      this.save_current_routine.emit("save");
    } else if(action == "change_tab"){
      this.store_current_routine.emit(this.current_routine);
    }

  }
}

export class SendDataRoutine{
  type_def: string;
  routine?: Routines;
  name?: string;
}

import { EventEmitter, Injectable } from '@angular/core';
import { Block, Routines_Blocks } from './models/blocks.model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class NewBlockService {

  newBlockAdded: EventEmitter<SendData> = new EventEmitter<SendData>();
  scrollEvent: EventEmitter<Event> = new EventEmitter<Event>();
  send_data: SendData = new SendData();
  send_data_routine: SendDataRoutine = new SendDataRoutine();

  constructor() { }

  emitData(event: DragEvent, block: Block) {
    this.send_data.event = event;
    this.send_data.block = block;
    this.newBlockAdded.emit(this.send_data);
  }

  sendScroll(event: Event){
    this.scrollEvent.emit(event);
  }

  // TODO llamar al post del restservice para mandar la routine
  save_button(type_def: string, routine?: Routines_Blocks){
    this.send_data_routine.type_def = type_def;
    if(routine){
      this.send_data_routine.routine = routine;
    }
    this.saveRoutineEvent.emit(this.send_data_routine);
  }

}

export class SendData{
  event: DragEvent;
  block: Block;
}
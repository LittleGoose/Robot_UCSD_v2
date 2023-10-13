import { EventEmitter, Injectable } from '@angular/core';
import { Block, Routines_Blocks } from './models/blocks.model';
import { RestService } from './rest.service';
import { SendDataRoutine } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class NewBlockService {

  newBlockAdded: EventEmitter<SendData> = new EventEmitter<SendData>();
  scrollEvent: EventEmitter<Event> = new EventEmitter<Event>();
  
  recentRoutine: EventEmitter<Event> = new EventEmitter<Event>(); // aqui merengues

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

  sendRecentRoutine(event: Event){ // aqui merengues x2
    this.recentRoutine.emit(event);
  }
}

export class SendData{
  event: DragEvent;
  block: Block;
}
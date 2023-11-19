import { EventEmitter, Injectable } from '@angular/core';
import { Block, Routines_Blocks } from './models/blocks.model';
import { SendDataRoutine } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class NewBlockService {

  newBlockAdded: EventEmitter<SendData> = new EventEmitter<SendData>();
  scrollEvent: EventEmitter<Event> = new EventEmitter<Event>();
  newTab: EventEmitter<string> = new EventEmitter<string>();

  send_data: SendData = new SendData();
  send_data_routine: SendDataRoutine = new SendDataRoutine();

  constructor() {}

  emitData(event: DragEvent, block: Block) { 
    // When dropping new block from sidebar
    this.send_data.event = event;
    this.send_data.block = block;
    this.newBlockAdded.emit(this.send_data);
  }

  sendScroll(event: Event){ // On-scroll in app
    this.scrollEvent.emit(event);
  }

  newTabClicked(){ // New tab is opened
    this.newTab.emit();
  }

}

export class SendData{
  event: DragEvent;
  block: Block;
}
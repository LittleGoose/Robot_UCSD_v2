import { EventEmitter, Injectable } from '@angular/core';
import { Block } from './models/blocks.model';

@Injectable({
  providedIn: 'root'
})
export class NewBlockService {

  newBlockAdded: EventEmitter<SendData> = new EventEmitter<SendData>();
  scrollEvent: EventEmitter<Event> = new EventEmitter<Event>();
  send_data: SendData = new SendData();

  constructor() { }

  emitData(event: DragEvent, block: Block) {
    this.send_data.event = event;
    this.send_data.block = block;
    this.newBlockAdded.emit(this.send_data);
  }

  sendScroll(event: Event){
    this.scrollEvent.emit(event);
  }
}

export class SendData{
  event: DragEvent;
  block: Block;
}
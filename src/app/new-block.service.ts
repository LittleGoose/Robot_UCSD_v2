import { EventEmitter, Injectable } from '@angular/core';
import { Block } from './models/blocks.model';

@Injectable({
  providedIn: 'root'
})
export class NewBlockService {

  newBlockAdded: EventEmitter<Block> = new EventEmitter<Block>();

  constructor() { }

  emitData(block: Block) {
    this.newBlockAdded.emit(block);
  }
}

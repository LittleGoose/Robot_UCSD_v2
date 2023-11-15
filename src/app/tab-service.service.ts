import { Injectable , EventEmitter} from '@angular/core';
import { Block } from './models/blocks.model';

@Injectable({
  providedIn: 'root'
})
export class TabServiceService {
  public tabAdded: EventEmitter<Block> = new EventEmitter<Block>();

  constructor() { }
  addTabToContainer(item: Block) {
    this.tabAdded.emit(item);
  }
}

import { Injectable , EventEmitter} from '@angular/core';
import { Block } from './models/blocks.model';
import { Routines } from './models/routines.model';

@Injectable({
  providedIn: 'root'
})
export class TabServiceService {
  public tabAdded: EventEmitter<Block_Routine> = new EventEmitter<Block_Routine>();

  constructor() { }
  addTabToContainer(item: Block, routine?: Routines) { 
    // Adding a new tab, if opened with routine then open the routine as well
    let block_routine = new Block_Routine;
    block_routine.block = item;
    if(routine != undefined){
      block_routine.routine = routine;
    }
    this.tabAdded.emit(block_routine);
  }
}

export class Block_Routine{
  block: Block;
  routine: Routines;
}

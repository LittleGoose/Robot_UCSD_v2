import { Injectable , EventEmitter} from '@angular/core';
import { Block } from './models/blocks.model';
import { Routines } from './models/routines.model';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class TabServiceService {
  public tabAdded: EventEmitter<Block_Routine> = new EventEmitter<Block_Routine>();

  constructor(private popUpService: PopUpService) { }
  addTabToContainer(item: Block, routine?: Routines) {
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

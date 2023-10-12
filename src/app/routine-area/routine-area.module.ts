import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BlockComponentComponent } from '../block-component/block-component.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopUpSaveComponent } from '../pop-up-save/pop-up-save.component';
import { PopUpClearComponent } from '../pop-up-clear/pop-up-clear.component';
//import { PopUpRoutinesComponent } from '../pop-up-routines/pop-up-routines.component';
import { PopUpLoadPreviousRoutineComponent } from '../pop-up-load-previous-routine/pop-up-load-previous-routine.component';

@NgModule({
  declarations: [BlockComponentComponent, PopUpComponent, PopUpSaveComponent, 
    PopUpClearComponent, PopUpLoadPreviousRoutineComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    BlockComponentComponent,
    PopUpComponent,
    PopUpSaveComponent,
    PopUpClearComponent,
    PopUpLoadPreviousRoutineComponent,
  ],
})
export class RoutineAreaModule { }

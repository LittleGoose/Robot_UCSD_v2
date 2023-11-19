import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BlockComponentComponent } from '../block-component/block-component.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopUpSaveComponent } from '../pop-up-save/pop-up-save.component';
import { PopUpClearComponent } from '../pop-up-clear/pop-up-clear.component';
import { PopUpLoadPreviousRoutineComponent } from '../pop-up-load-previous-routine/pop-up-load-previous-routine.component';
import { PopUpNameDuplicateComponent } from '../pop-up-name-duplicate/pop-up-name-duplicate.component';

// Dont forget to add Component to routines to get the ionic libraries working
@NgModule({
  declarations: [BlockComponentComponent, PopUpComponent, PopUpSaveComponent, PopUpNameDuplicateComponent,
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

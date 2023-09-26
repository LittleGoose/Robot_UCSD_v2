import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BlockComponentComponent } from '../block-component/block-component.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopUpSaveComponent } from '../pop-up-save/pop-up-save.component';

@NgModule({
  declarations: [BlockComponentComponent, PopUpComponent, PopUpSaveComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    BlockComponentComponent,
    PopUpComponent,
    PopUpSaveComponent,
  ],
})
export class RoutineAreaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { BlockComponentComponent } from '../block-component/block-component.component';
import { PopUpComponent } from '../pop-up/pop-up.component';

@NgModule({
  declarations: [BlockComponentComponent, PopUpComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    BlockComponentComponent,
    PopUpComponent,
  ],
})
export class RoutineAreaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BlockComponentComponent } from '../block-component/block-component.component';

@NgModule({
  declarations: [BlockComponentComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    BlockComponentComponent
  ],
})
export class RoutineAreaModule { }

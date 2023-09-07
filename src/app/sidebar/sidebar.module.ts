import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SidebarFirstComponent } from '../sidebar-first/sidebar-first.component';
import { SidebarSecondComponent } from '../sidebar-second/sidebar-second.component';


@NgModule({
  declarations: [SidebarFirstComponent, SidebarSecondComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    SidebarFirstComponent,
    SidebarSecondComponent,
  ],
})
export class SidebarModule { }

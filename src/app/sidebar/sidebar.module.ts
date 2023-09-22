import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SidebarFirstComponent } from '../sidebar-first/sidebar-first.component';
import { SidebarSecondComponent } from '../sidebar-second/sidebar-second.component';

import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SidebarFirstComponent, SidebarSecondComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  exports: [
    SidebarFirstComponent,
    SidebarSecondComponent,
  ],
  providers: [RestService]
})
export class SidebarModule { 
  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // Aqui inica las funciones para hacer el Scroll
  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }
}

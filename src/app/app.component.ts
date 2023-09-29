import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RoutineAreaModule } from './routine-area/routine-area.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PopUpService } from './pop-up.service';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './rest.service';
import { NewBlockService } from './new-block.service';


import { OnInit } from '@angular/core';
import { Facial_Expression } from './models/blocks.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, 
    RoutineAreaModule, 
    SidebarModule,
    FormsModule,
    HttpClientModule],
  providers:[PopUpService, RestService, NewBlockService],
})

export class AppComponent implements OnInit {

  //rootPage2 = 'Panel2Page';
  
  ngOnInit() {
    
  }

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

  // Aqui termina las funciones para hacer el scroll
  constructor(private new_block: NewBlockService, private popUpService: PopUpService) {}

  onScroll(event: Event){
    console.log("Scrolled")
    this.new_block.sendScroll(event);
  }

  saveRoutine(){
    this.popUpService.ask_name("ask");
  }

  clearRoutine(){
    this.popUpService.openModal_Clear();
  }
}

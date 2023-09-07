import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RoutineAreaModule } from './routine-area/routine-area.module';

import { OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, RoutineAreaModule],
})

export class AppComponent implements OnInit {
  rootPage1 = 'Panel1Page';
  rootPage2 = 'Panel2Page';
  rootPage3 = 'Panel3Page';

  facial_expresions:string[] = ["Happy","Sad","Mad","Angry","Crazy"];
  body_gestures:string[] = ["Nod","Turn","Walk","Side_head","Bow"];
  tone_of_voice:string[] = ["Excited","Timid","Sad","Slow","Fast"];
  speach:string[] = ["Listen","Talk","Hum","Scream","Agree"];
  routines:string[] = ["Dance_1","Conversation_1","Coffe_talk_2","Apologyze","Aggreable_2"];

  options:string[] = [];

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    
    let totalexpressions = this.facial_expresions.length;
    for (let i = 0; i < totalexpressions; i++) {
      this.options.push(` ${this.facial_expresions[i]}`);
    }

    let totalgestures = this.body_gestures.length;
    for (let i = 0; i < totalgestures; i++) {
      this.options.push(` ${this.body_gestures[i]}`);
    }

    let totalvoices = this.tone_of_voice.length;
    for (let i = 0; i < totalvoices; i++) {
      this.options.push(` ${this.tone_of_voice[i]}`);
    }

    let totalspeach = this.speach.length;
    for (let i = 0; i < totalspeach; i++) {
      this.options.push(` ${this.speach[i]}`);
    }

    let totalroutines = this.routines.length;
    for (let i = 0; i < totalroutines; i++) {
      this.options.push(` ${this.routines[i]}`);
    }
    
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  funcionalidad(){}

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
  constructor() {}
  
}

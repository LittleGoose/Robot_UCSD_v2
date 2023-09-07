import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent implements OnInit {
  rootPage1 = 'Panel1Page';
  rootPage2 = 'Panel2Page';
  rootPage3 = 'Panel3Page';

  names:string[] = ["Happy","Sad","Mad","Angry","Crazy","hola","hola","hola","hola","hola","hola","hola","hola","hola","hola"];

  expressions:string[] = [];

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    
    let totalNames = this.names.length;
    for (let i = 0; i < totalNames; i++) {
      this.expressions.push(` ${this.names[i]}`);
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

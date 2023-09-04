import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OnInit } from '@angular/core';

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

  names:string[] = ["Happy","Sad","Mad","Angry","Crazy"];

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

  constructor() {}
}

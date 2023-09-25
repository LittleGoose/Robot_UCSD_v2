import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ScrollService } from '../scroll.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss'],
})
export class SidebarSecondComponent implements OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  private scrollSubscription: Subscription;
  

  

  constructor(private scrollService: ScrollService) {
    this.scrollSubscription = this.scrollService.getScrollObservable().subscribe(({positionX, positionY }) => 
    {
      this.content.scrollToPoint(positionX, positionY, 500); // Realizar el scroll en este componente
    });
  }
  ngOnDestroy() {
      this.scrollSubscription.unsubscribe(); // Importante desuscribirse al destruir el componente
  }
  

  rootPage2 = 'Panel2Page';
  
  //TODO: Cambiar por emotions:  { clave: string; valor: string, imgUrl: string }[] = [
  emotions:  { clave: string; valor: string }[] = [
    { clave: "Happy", valor: "Im Happy"},
    { clave: "Sad", valor: "I'm Feeling Sad"},
    { clave: "Angry", valor: "Im angry"},
    { clave: "Crazy", valor: "Im Crazy"},
    { clave: "Nod", valor: "I'm Nodding"},
    { clave: "Turn", valor: "I'm Turning"},
    { clave: "Walk", valor: "I'm Walking"},
    { clave: "Side_head", valor: "I'm Tilting My Head"},
    { clave: "Bow", valor: "I'm Bowing"},
    { clave: "Excited", valor: "I'm Excited"},
    { clave: "Timid", valor: "I'm Being Timid"},
    { clave: "Slow", valor: "I'm Moving Slowly"},
    { clave: "Fast", valor: "I'm Moving Fast"},
    { clave: "Listen", valor: "I'm Listening"},
    { clave: "Talk", valor: "I'm Talking"},
    { clave: "Hum", valor: "I'm Humming"},
    { clave: "Scream", valor: "I'm Screaming"},
    { clave: "Agree", valor: "I'm Agreeing"},
    { clave: "Dance", valor: "I'm Dancing"},
    { clave: "Conversation", valor: "I'm Having a Conversation"},
    { clave: "Coffe_talk", valor: "I'm Having a Coffee Talk"},
    { clave: "Apologyze", valor: "I'm Apologizing"},
    { clave: "Aggreable2", valor: "I'm Being Agreeable"}
  ];

  ngOnInit() {}

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
  

  


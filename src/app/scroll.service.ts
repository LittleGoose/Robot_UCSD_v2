import { Injectable } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  @ViewChild(IonContent) content: IonContent ;
  public scrollEvent = new EventEmitter<{ positionX: number, positionY: number }>();

  constructor() { }

  getScrollObservable(): Observable<{positionX: number, positionY: number }> { // Update scroll for block-view
    return this.scrollEvent.asObservable();
  }
}

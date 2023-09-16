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

  sendInformation(positionX: number, positionY: number) {
    this.scrollEvent.emit({ positionX, positionY });
  }
  getScrollObservable(): Observable<{positionX: number, positionY: number }> {
    return this.scrollEvent.asObservable();
  }

 

  //scrollToPosition(content: IonContent, positionX: number, positionY: number) {
    //content.scrollToPoint(positionX, positionY, 500); // 500 ms de duración, ajusta según sea necesario
  //}
}

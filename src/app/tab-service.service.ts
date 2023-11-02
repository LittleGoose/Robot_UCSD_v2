import { Injectable , EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabServiceService {
  public tabAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
  addTabToContainer() {
    this.tabAdded.emit();
  }
}

import { Component, OnInit } from '@angular/core';
import { PopoverController  } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-load-previous-routine',
  templateUrl: './pop-up-load-previous-routine.component.html',
  styleUrls: ['./pop-up-load-previous-routine.component.scss'],
})
export class PopUpLoadPreviousRoutineComponent  implements OnInit {

  constructor(private popoverController : PopoverController ) { }

  ngOnInit() {}
  
  buttonPressed(action: string) {
    // Cierra el popover solo si se presiona "Yes"
    if (action === 'yes') {
      //TODO: Retrive data of routines from DB
    }
    else if(action === 'no')
    {
      //NOTE: Do nothing
    }
    this.popoverController.dismiss();
  }
}


import { Component, OnInit} from '@angular/core';
import { PopoverController  } from '@ionic/angular';
import { NewBlockService } from '../new-block.service';


@Component({
  selector: 'app-pop-up-load-previous-routine',
  templateUrl: './pop-up-load-previous-routine.component.html',
  styleUrls: ['./pop-up-load-previous-routine.component.scss'],
})
export class PopUpLoadPreviousRoutineComponent implements OnInit {

  constructor(private popoverController : PopoverController) { }

  componentRef;

  ngOnInit() {}

  buttonPressed(str?: string) { // Yes or no 
    if(str == "yes"){
      this.popoverController.dismiss("yes");
    }else{
      this.popoverController.dismiss();
    }
  }
}


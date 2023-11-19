import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-name-duplicate',
  templateUrl: './pop-up-name-duplicate.component.html',
  styleUrls: ['./pop-up-name-duplicate.component.scss'],
})
export class PopUpNameDuplicateComponent  implements OnInit {

  @Input() routine_name: String; // Name of the routine that's being duplicated

  constructor(private popOverContoller: PopoverController) { }

  ngOnInit() {
  }

  cancel(){  // Return yes or no
    this.popOverContoller.dismiss(0);
  }

  replace(){
    this.popOverContoller.dismiss(1);
  }

}

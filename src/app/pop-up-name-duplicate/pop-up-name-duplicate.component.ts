import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-name-duplicate',
  templateUrl: './pop-up-name-duplicate.component.html',
  styleUrls: ['./pop-up-name-duplicate.component.scss'],
})
export class PopUpNameDuplicateComponent  implements OnInit {

  @Input() routine_name: String; // Name of the routine that's being duplicated

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cancel(){  // Return yes or no
    this.modalController.dismiss(0);
  }

  replace(){
    this.modalController.dismiss(1);
  }

}

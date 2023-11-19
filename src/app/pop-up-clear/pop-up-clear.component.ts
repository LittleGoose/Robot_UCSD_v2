import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpService } from '../pop-up.service';

@Component({
  selector: 'app-pop-up-clear',
  templateUrl: './pop-up-clear.component.html',
  styleUrls: ['./pop-up-clear.component.scss'],
})
export class PopUpClearComponent {

  constructor(private modalController: ModalController, private popUpService: PopUpService){ }

  ngOnInit(): void { }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  butomYes() // Return yes or no to pop-up service
  {
    this.modalController.dismiss(null, 'Yes');
  }
  butomNo()
  {
    this.modalController.dismiss(null, 'cancel');
  }

}

import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { PopUpService } from '../pop-up.service';
import { Send_block } from '../models/routines.model';

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

  butomYes()
  {

  }
  butomNo()
  {
    this.modalController.dismiss(null, 'cancel');
  }
  butomSave(){
    
  }

}

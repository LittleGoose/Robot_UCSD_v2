import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { PopUpService } from '../pop-up.service';



@Component({
  selector: 'app-pop-up-name-duplicate',
  templateUrl: './pop-up-name-duplicate.component.html',
  styleUrls: ['./pop-up-name-duplicate.component.scss'],
})
export class PopUpNameDuplicateComponent  implements OnInit {

  @Input() routine_name: String;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss(0);
  }

  replace(){
    this.modalController.dismiss(1);
  }

}

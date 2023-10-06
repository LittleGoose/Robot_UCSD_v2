import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../pop-up.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-routines',
  templateUrl: './pop-up-routines.component.html',
  styleUrls: ['./pop-up-routines.component.scss'],
})
export class PopUpRoutinesComponent {

  constructor(private modalController: ModalController, private popUpService: PopUpService) { }

  ngOnInit() {}

  buttonDelete() {
    console.log("Se presiono el boton delete")
    this.modalController.dismiss(null, 'Delete');
  }

  buttonDownload(){
    console.log("Se presiono el boton download")
    this.modalController.dismiss(null, 'Download');
  }



}

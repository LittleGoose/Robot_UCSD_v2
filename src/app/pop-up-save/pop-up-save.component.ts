import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopUpService } from '../pop-up.service';
import { Send_block } from '../models/routines.model';
import { NewBlockService } from '../new-block.service';

@Component({
  selector: 'app-pop-up-save',
  templateUrl: './pop-up-save.component.html',
  styleUrls: ['./pop-up-save.component.scss'],
})
export class PopUpSaveComponent {
  @Input() name: string;
  selectedValue: number;
  talk: string;
  name_routine: string;

  constructor(private modalController: ModalController, private popUpService: PopUpService) {}

  ngOnInit(): void {
    this.name_routine = this.name;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  save() {
    this.modalController.dismiss(null, this.name_routine);
  }
}

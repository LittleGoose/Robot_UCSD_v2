import { Component, Input } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PopUpService } from '../pop-up.service';
import { Send_block } from '../models/routines.model';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {

  @Input() block: Send_block; // Open a specific block with specific characteristics
  selectedValue: number;
  talk: string;
  clear: string;
  tone_voice: string;

  constructor(private modalController: ModalController, private popUpService: PopUpService){ }

  ngOnInit(): void { // Initialize the pop-up with those characteristics
    this.selectedValue = this.block.level;
    this.talk = this.block.talk;
    this.clear = this.block.clear;
    this.tone_voice = this.block.tone_voice;
   }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  pinFormatter(value: number) { // Level is modified

    let level : string = "";

    switch(value) { 
      case 0: { 
         level = "Low";
         break; 
      } 
      case 1: { 
        level = "Medium";
         break; 
      } 
      case 2: { 
        level = "High";
        break; 
     } 
      default: { 
         break; 
      } 
   } 
    return level;
  }

  save(){ // Only updating values when clicking the save button
    switch(this.block.class){
      case 'facial_expression': {
        this.block.level = this.selectedValue;
        break;
      }
      case 'body_gesture': {
        this.block.level = this.selectedValue;
        break;
      }
      case 'speech': {
        this.block.talk = this.talk;
        this.block.tone_voice = this.tone_voice;
        break;
      }
      case 'clear':
        {
          this.block.clear= this.clear;
          break;
        }
       
    }
    this.modalController.dismiss(this.block, 'dataSaved'); // Update the new block in block-component
  }

}

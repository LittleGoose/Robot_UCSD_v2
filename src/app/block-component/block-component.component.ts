import { Component, OnInit, ViewChild } from '@angular/core';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from '../models/blocks.model';
import { Routines, Send_block } from '../models/routines.model';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopUpService } from '../pop-up.service';
import { PopUpComponent } from '../pop-up/pop-up.component';


@Component({
  selector: 'app-block-component',
  templateUrl: './block-component.component.html',
  styleUrls: ['./block-component.component.scss'],
})

export class BlockComponentComponent  implements OnInit {

  current_routine: Routines = new Routines();

  block1: Send_block = new Send_block();
  block2: Send_block = new Send_block();
  block3: Send_block = new Send_block();
  block4: Send_block = new Send_block();

  current_block: Send_block = new Send_block();

  constructor(private popUpService: PopUpService) {
    // Initialize the routine
    this.block1.name = "Happy";
    this.block1.level = 1;
    this.block1.class = "facial_expression"

    this.block2.name = "Talk";
    this.block2.talk = "Hello";
    this.block2.class = "speach"

    this.block4.name = "Clear";
    this.block4.clear= "";
    this.block4.class= "clear";

    this.block3.name = "Hum";

    this.current_routine.array_block = [[this.block1, this.block2, this.block4], [this.block3]];

    this.popUpService.blockUpdated.subscribe((newBlock: Send_block) => {
      // Call your component's function or perform necessary actions
      this.saveNewParameter(newBlock);
    });

    console.log(this.current_routine.array_block); 
  }
  
  ngOnInit() {}

  openPopUp(event: MouseEvent, block: Send_block) {
    if (event.detail === 2) {
      this.current_block = block;
      this.popUpService.openModal(block); 
    }
  }

  saveNewParameter(block: Send_block){
    this.current_block = block;
    console.log(this.current_block);
    console.log(this.block2);
  }
}
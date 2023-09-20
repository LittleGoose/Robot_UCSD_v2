import { Component, OnInit, ViewChild } from '@angular/core';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from '../models/blocks.model';
import { Routines, Send_block } from '../models/routines.model';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopUpService } from '../pop-up.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { NewBlockService } from '../new-block.service';


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

  current_block: Send_block = new Send_block();

  constructor(private popUpService: PopUpService, private newBlockService: NewBlockService) {
    // Initialize the routine
    /*this.block1.name = "Happy";
    this.block1.level = 1;
    this.block1.class = "facial_expression"

    this.block2.name = "Talk";
    this.block2.talk = "Hello";
    this.block2.class = "speech"

    this.block3.name = "Hum";
    this.block3.class = "speech"*/

    //this.current_routine.array_block = [[this.block1, this.block2], [this.block3]];
    this.current_routine.array_block = [[]];

    this.popUpService.blockUpdated.subscribe((newBlock: Send_block) => {
      // Call your component's function or perform necessary actions
      this.saveNewParameter(newBlock);
    });

    this.newBlockService.newBlockAdded.subscribe((data) => {
      this.current_block = new Send_block();
      this.current_block.name = data.block.label;
      switch(data.block.constructor.name){
        case "Facial_Expression":
          this.current_block.class = "facial_expression";
          break;
        case "Body_Gestures":
          this.current_block.class = "body_gesture";
          break;
        case "Tone_Voice":
          this.current_block.class = "tone_of_voice";
          break;
        case "Speech":
          this.current_block.class = "speech";
          break;
        case "Routines_Blocks":
          this.current_block.class = "routine";
          break;
      }

      data.event.preventDefault(); // Prevent the default behavio
    
      const mouseX = data.event.pageX;
      const mouseY = data.event.pageY;

      console.log(`Item dropped at (${mouseX}, ${mouseY})`);

      this.current_routine.array_block[0].push(this.current_block);

    });

    //console.log(this.current_routine.array_block); 
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
    //console.log(this.block2);
  }
}
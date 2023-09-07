import { Component, OnInit } from '@angular/core';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from '../models/blocks.model';
import { Routines, Send_block } from '../models/routines.model';

@Component({
  selector: 'app-block-component',
  templateUrl: './block-component.component.html',
  styleUrls: ['./block-component.component.scss'],
})

export class BlockComponentComponent  implements OnInit {

  //currentBlock: Facial_Expression = new Facial_Expression();

  current_routine: Routines = new Routines();

  block1: Send_block = new Send_block();
  block2: Send_block = new Send_block();
  block3: Send_block = new Send_block();

  constructor() {
    // Initialize the routine
    this.block1.name = "Serious";
    this.block1.level = 2;

    this.block2.name = "Talk";
    this.block2.talk = "Hello";

    this.block3.name = "Hum";

    this.current_routine.array_block = [[this.block1, this.block2], [this.block3]];

    console.log(this.current_routine.array_block);
    
  }

  ngOnInit() {}

}

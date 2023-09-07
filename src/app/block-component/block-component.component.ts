import { Component, OnInit } from '@angular/core';
import { Block, Facial_Expression } from '../models/blocks.model';

@Component({
  selector: 'app-block-component',
  templateUrl: './block-component.component.html',
  styleUrls: ['./block-component.component.scss'],
})

export class BlockComponentComponent  implements OnInit {

  currentBlock: Facial_Expression = new Facial_Expression();

  constructor() {
    // Initialize the properties of the newPerson object
    this.currentBlock.label = "Serious";
    this.currentBlock.id_in_robot = 'E1';
    this.currentBlock.level = 1;
  }

  ngOnInit() {}

}



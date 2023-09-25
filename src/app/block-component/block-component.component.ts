import { Component, OnInit } from '@angular/core';
import { Routines, Send_block } from '../models/routines.model';
import { PopUpService } from '../pop-up.service';

@Component({
  selector: 'app-block-component',
  templateUrl: './block-component.component.html',
  styleUrls: ['./block-component.component.scss'],
})
export class BlockComponentComponent implements OnInit {
  current_routine: Routines = new Routines();
  block1: Send_block = new Send_block();
  block2: Send_block = new Send_block();
  block3: Send_block = new Send_block();
  block4: Send_block = new Send_block();

  current_block: Send_block = new Send_block();

  constructor(private popUpService: PopUpService) {
    // Initialize the routine
    this.block1.name = 'Happy';
    this.block1.level = 2;
    this.block1.class = 'facial_expression';

    this.block2.name = 'Talk';
    this.block2.talk = 'Hello';
    this.block2.class = 'speech';

    this.block3.name = 'Hum';

    this.block4.name = 'Save';
    this.block4.level = 0; // Asigna el nivel deseado
    this.block4.class = 'some_class'; // Asigna la clase deseada

    this.current_routine.array_block = [[this.block1, this.block2], [this.block3], [this.block4]];

    this.popUpService.blockUpdated.subscribe((newBlock: Send_block) => {
      // Call your component's function or perform necessary actions
      this.saveNewParameter(newBlock);
    });

    console.log(this.current_routine.array_block);
  }

  ngOnInit() {
    // Initialization logic if needed
  }

  openPopUp(event: MouseEvent, block: Send_block) {
    if (event.detail === 2) {
      this.current_block = block;
      this.popUpService.openModal(block);
    }
  }

  saveNewParameter(block: Send_block) {
    this.current_block = block;
    console.log(this.current_block);
    // No existe this.block2 en este contexto, verifica si deseas usar otro bloque.
  }
}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular';
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

export class BlockComponentComponent implements AfterViewInit {
  @ViewChild('start', { static: false, read: ElementRef }) startElement: ElementRef;
  @ViewChild('end', { static: false, read: ElementRef }) endElement: ElementRef;
  @ViewChildren('blockRef') buttons: QueryList<QueryList<IonButton>>;
  @ViewChild('blockRef', { read: ElementRef }) buttonRef: ElementRef;
  @ViewChild('grid', { read: ElementRef }) gridRef: ElementRef;

  current_routine: Routines = new Routines();

  block1: Send_block = new Send_block();
  block2: Send_block = new Send_block();
  block3: Send_block = new Send_block();

  current_block: Send_block = new Send_block();

  blocks: number = 0;

  cellPositions: { center_x: number; center_y: number}[] = [];
  // Create a Set to store unique x values
  ColValues = new Set<number>();
  RowValues = new Set<number>();
  scrollPosition = 0;

  constructor(private popUpService: PopUpService, private newBlockService: NewBlockService, 
    private ionContent: IonContent, private renderer: Renderer2) {
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
    
      /*const mouseX = data.event.pageX;
      const mouseY = data.event.pageY;

      console.log(`Item dropped at (${mouseX}, ${mouseY})`);*/

      this.check_cells_positions();

      //console.log("COOOOLLL", this.updatedColValues);

      let index = 0;

      console.log()
      
      for (const num of this.ColValues) {
        // 'num' holds the current number in the set
        if(num > (data.event.pageY)){
          break;
        }
        index++;
      }

      /*const RowValues = new Set<number>();
      // Iterate through the coordinates and add unique x values to the Set
      for (const coord of this.cellPositions) {
        this.ColValues.add(coord.center_y);
      }*/

      // Calculate the center coordinates
      this.current_routine.array_block.splice(index, 0, [this.current_block]);
      //his.current_routine.array_block.push([this.current_block]);
      this.blocks += 1;

    });
    //console.log(this.current_routine.array_block); 
  }

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

  ngAfterViewInit() {
    this.ionContent.scrollToTop(0);

    // Check if the startElement and endElement are defined
    setTimeout(() => {
      // Check if the startElement and endElement are defined
      if (this.startElement && this.endElement) {
        // Use Renderer2 to get the coordinates of the elements
        const startRect = this.startElement.nativeElement.getBoundingClientRect();
        const endRect = this.endElement.nativeElement.getBoundingClientRect();

        // Calculate the center coordinates for each element
        const startCenterX = startRect.left + startRect.width / 2;
        const startCenterY = startRect.top + startRect.height / 2;

        const endCenterX = endRect.left + endRect.width / 2;
        const endCenterY = endRect.top + endRect.height / 2;

        console.log(`Start Center X: ${startCenterX}px, Start Center Y: ${startCenterY}px`);
        console.log(`End Center X: ${endCenterX}px, End Center Y: ${endCenterY}px`);

        const gridElement = this.gridRef.nativeElement;
        gridElement.addEventListener('scroll', this.onScroll.bind(this));

      } else {
        console.error('Elements not found');
      }
    }, 500); // Adjust the timeout duration as needed
  }

  check_cells_positions(){
    this.ionContent.scrollToTop(0);
    setTimeout(() => {
      // Get the grid element
    const grid = document.getElementById('grid');

    this.cellPositions = [];

    if (grid) {
      // Get all cell elements within the grid
      const cells = grid.querySelectorAll('ion-col');

      // Initialize an array to store cell positions
      // Loop through each cell and calculate its position
      
      cells.forEach((cell) => {
        if(cell.id === 'padding'){
          return;
        }
        // Calculate the cell's position relative to the grid container
        const rect = cell.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        const cellPosition: { center_x: number; center_y: number } = {
          center_x: rect.left + rect.width / 2,
          center_y: rect.top + rect.height / 2
        };

        // Add the cell's position to the array
        this.cellPositions.push(cellPosition);
      });

      // Now, cellPositions contains the positions of all cells in the grid

    } else {
      console.error('Grid element not found.');
    }
    
    this.ColValues = new Set<number>();
    // Iterate through the coordinates and add unique x values to the Set
    for (const coord of this.cellPositions) {
      this.ColValues.add(coord.center_y);
    }

    },500);
  }

  onScroll(event){
    this.scrollPosition = event.detail.scrollTop;

    // Use scrollPosition as needed
    console.log('Scroll position:', this.scrollPosition);
    this.check_cells_positions();
  }
}
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from '../models/blocks.model';
import { Routines, Send_block } from '../models/routines.model';
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
  block4: Send_block = new Send_block();

  current_block: Send_block = new Send_block();

  blocks: number = 0;
  dif: number = 0;

  cellPositions: { center_x: number; center_y: number}[] = [];
  // Create a Set to store unique x values
  ColValues = new Set<number>();
  RowValues = new Set<number>();
  scrollPosition = 0;

  startRect = new DOMRect;
  endRect = new DOMRect;
  
  constructor(private popUpService: PopUpService, private newBlockService: NewBlockService, 
    private ionContent: IonContent, private renderer: Renderer2) {

    this.current_routine.array_block = [];
    //this.current_routine.name = "Test_routine";

    this.popUpService.blockUpdated.subscribe((newBlock: Send_block) => {
      // Call your component's function or perform necessary actions
      this.saveNewParameter(newBlock);
    });

    this.popUpService.clearRoutine.subscribe((data) => {
      this.current_routine = new Routines();
    });
    
    this.newBlockService.newBlockAdded.subscribe((data) => {
      this.current_block = new Send_block();
      this.current_block.name = data.block.label;
      this.current_routine.description = "Description of routine";
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

      let index_row = 0;
      let index_col = 0;
      let past_num = 0;
      let dif = 0;
      let third = 0;

      const colArray: number[] = Array.from(this.ColValues);

      let RowValues = new Set<number>();
      // Iterate through the coordinates and add unique x values to the Set

      const divide = 7;

      this.reset_edges();

      if(data.event.pageY < this.startRect.top || data.event.pageY > this.endRect.bottom || data.event.pageX < this.startRect.left){
        console.log("Outside of bounds")
      } else if (this.current_block.name == this.current_routine.name){
        console.log("Can't add routine to the current one")
      } else {
        if(colArray.length == 0){
          this.current_routine.array_block[0] = [this.current_block];
        } else {
          for (const num of this.ColValues) {
            if(num + (this.dif/divide) > data.event.pageY){
              if(num - (this.dif/divide) < data.event.pageY){
  
                console.log("Add to previous")
                
                // Routines can't be added in a row with other blocks
                if(this.current_block.class == "routine"){
                  break;
                }
  
                let break_var = 0;
  
                for(let i = 0; i < this.current_routine.array_block[index_row].length; i++) {
                  if(this.current_routine.array_block[index_row][i].class == this.current_block.class 
                    || this.current_routine.array_block[index_row][i].class == "routine"){
                    break_var = 1;
                    break;
                  }
                }
  
                if(break_var == 1){
                  break;
                }
  
                for (const coord of this.cellPositions) {
                  if (coord.center_y == num){
                    if(coord.center_x > data.event.pageX){
                      break;
                    }
                    index_col++;
                  }
                }
                this.current_routine.array_block[index_row].splice(index_col, 0, this.current_block);
                this.blocks += 1;
              } else {
                this.current_routine.array_block.splice(index_row, 0, [this.current_block]);
                this.blocks += 1;
              }
              break;
            }
            index_row++;
          }
        }
  
        if(data.event.pageY > colArray[colArray.length - 1] + (this.dif/divide)){
          this.current_routine.array_block.push([this.current_block]);
          this.blocks += 1;
        }
      }
    });
    
    this.popUpService.saveRoutineEvent.subscribe((data) => {
      if(data.type_def === "Send_Name_Please"){
        let send_routine = new Routines_Blocks(this.current_routine.id, data.name, this.current_routine.description);
        this.current_routine.name = data.name;

        this.popUpService.save_button(data, send_routine); //ximena implementar save console.log(this.current_routine.array_block);
      }
    });

    this.popUpService.NameRoutine.subscribe((data) => { // When clicking save this is called
      if(data == "ask"){
        this.popUpService.ask_name("respond", this.current_routine.name);
      }
    })
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
    //console.log(this.block2);
  }

  reset_edges(){
    if (this.startElement && this.endElement) {
      // Use Renderer2 to get the coordinates of the elements
      const startRect = this.startElement.nativeElement.getBoundingClientRect();
      this.startRect = startRect;
      const endRect = this.endElement.nativeElement.getBoundingClientRect();
      this.endRect = endRect;

      const gridElement = this.gridRef.nativeElement;
      gridElement.addEventListener('scroll', this.onScroll.bind(this));

    } else {
      console.error('Elements not found');
    }
  }

  ngAfterViewInit() {
    this.ionContent.scrollToTop(0);

    // Check if the startElement and endElement are defined
    setTimeout(() => {
      // Check if the startElement and endElement are defined
      this.reset_edges()
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
        this.dif = rect.width;
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

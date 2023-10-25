import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList,  ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { IonButton, IonContent, PopoverController } from '@ionic/angular';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from '../models/blocks.model';
import { Routines, Send_block } from '../models/routines.model';
import { PopUpService } from '../pop-up.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { NewBlockService } from '../new-block.service';
import { SendData } from '../new-block.service';
import { RestService } from '../rest.service';
import { PopUpLoadPreviousRoutineComponent } from '../pop-up-load-previous-routine/pop-up-load-previous-routine.component';
import { TabsComponent } from '../tabs/tabs.component';
import {OverlayEventDetail} from '@ionic/core'; 

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
  @ViewChild('botonesContainer', { read: ViewContainerRef }) botonesContainer: ViewContainerRef;

  current_routine: Routines = new Routines();
  block1: Send_block = new Send_block();
  block2: Send_block = new Send_block();
  block3: Send_block = new Send_block();
  block4: Send_block = new Send_block();

  current_block: Send_block = new Send_block();

  blocks: number = 0;
  dif: number = 0;

  cellPositions: { center_x: number; center_y: number, length: number, height: number}[] = [];
  scrollPosition = 0;

  startRect = new DOMRect;
  endRect = new DOMRect;

  isToastOpenClass = false;
  isToastOpenRoutine = false;
  
  GetChildData(data){  
    console.log(data);  
  } 

  constructor(private popUpService: PopUpService, private newBlockService: NewBlockService, 
    private ionContent: IonContent, private renderer: Renderer2, private rs: RestService, 
    private popoverController: PopoverController, private componentFactoryResolver: ComponentFactoryResolver) {

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
      const dropped = this.dragFuncion(data.event, data.block); // Make sure it's actually dropped in a valid place
      if(dropped){
        this.openPopUp(this.current_block);
      }
    });
    
    this.popUpService.saveRoutineEvent.subscribe((data) => {
      if(data.type_def === "Send_Name_Please"){
        let send_routine = new Routines();
        send_routine.id = this.current_routine.id;
        send_routine.name = data.name
        send_routine.description = this.current_routine.description
        send_routine.array_block = this.current_routine.array_block
        this.current_routine.name = data.name;
        this.popUpService.save_button(data, send_routine); 
      
      } else if(data.type_def === "Show_Routine"){ //ximena implementar save console.log(this.current_routine.array_block);
        // Sending it to database
        this.rs.upload_routine(data.routine).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });

    this.popUpService.NameRoutine.subscribe((data) => { // When clicking save this is called
      if(data == "ask"){
        this.popUpService.ask_name("respond", this.current_routine);
      }
    })

    this.newBlockService.recentRoutine.subscribe((data) => {          
      if(this.current_routine.array_block.length != 0){
        this.current_routine.array_block = [];
      }
        this.rs.get_recent_routine()
            .subscribe(
              (response) => {
                  response.forEach(element => {
                    this.current_routine.array_block.push([]);
                    element.forEach(block_item => {
                      let block = new Send_block();
                      block.class = block_item.class;
                      block.name = block_item.name;
                      block.level = block_item.level;
                      block.talk = block_item.talk;
                      block.clear = block_item.clear;
                      this.current_routine.array_block[this.current_routine.array_block.length-1].push(block);
                    });
                  });
              },(error) => {
                  console.log("No Data Found" + error);
              }
            )
      }
    )
  }


  async ngOnInit() {
    // Abre el popover personalizado tan pronto como la página se inicie
    const popover = await this.popoverController.create({
      component: PopUpLoadPreviousRoutineComponent, // Reemplaza con tu página de popover personalizado
      // Coloca las propiedades de posición y otros ajustes según tus necesidades
    });

    await popover.present();
    await popover.onDidDismiss()
    .then((detail: OverlayEventDetail) => {
        if(detail.data == "yes"){
          
          this.rs.get_recent_routine()
          .subscribe(
            (response) => {
                response.forEach(element => {
                  this.current_routine.array_block.push([]);
                  element.forEach(block_item => {
                    let block = new Send_block();
                    block.class = block_item.class;
                    block.name = block_item.name;
                    block.level = block_item.level;
                    block.talk = block_item.talk;
                    block.clear = block_item.clear;
                    this.current_routine.array_block[this.current_routine.array_block.length-1].push(block);
                  });
                });
            },(error) => {
                console.log("No Data Found" + error);
            }
          )
        }
    });

  }

  test(event: any){
    console.log("test");
  }

  openPopUp(block: Send_block, event?: MouseEvent,) {
    if(event != undefined){
      if (event.detail === 2) {
        this.current_block = block;
        if(this.current_block.class == "speech" && this.current_block.name != "Talk"){
          // Sounds not showing pop-up
        } else {
          this.popUpService.openModal(block);
        }
      }
    } else {
      if ( block.class != 'routine'){
        if(block.class == "speech" && block.name == "Talk"){
          this.popUpService.openModal(block);
        } else {
          if (block.class != "routine" && block.class != "speech"){
            this.popUpService.openModal(block);
          }
        }
      }
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
      // Loop through each number cell and calculate its position
      
      cells.forEach((cell) => {
        if(cell.id === 'num'){
          // Calculate the cell's position relative to the grid container
          const rect = cell.getBoundingClientRect();
          this.dif = rect.width;
          const cellPosition: { center_x: number; center_y: number, length: number, height:number } = {
            center_x: rect.left + rect.width / 2,
            center_y: rect.top + rect.height / 2,
            length: rect.width,
            height: rect.height,
          };

          // Add the cell's position to the array
          this.cellPositions.push(cellPosition);
        }
      });

      // Now, cellPositions contains the positions of all cells in the grid

    } else {
      console.error('Grid element not found.');
    }

    },500);
  }

  onScroll(event){
    this.scrollPosition = event.detail.scrollTop;

    // Use scrollPosition as needed
    console.log('Scroll position:', this.scrollPosition);
    this.check_cells_positions();
  }

  dragFuncion(event: DragEvent, block?: Block, send_block?: Send_block, rearenge?: boolean) : boolean{

    // Where was the block you grabbed ?
    const position = { row: -1, column: -1 };

    if(rearenge){
      for (let rowIndex = 0; rowIndex < this.current_routine.array_block.length; rowIndex++) {
        const currentRow = this.current_routine.array_block[rowIndex];
        for (let columnIndex = 0; columnIndex < currentRow.length; columnIndex++) {
          if (currentRow[columnIndex] === send_block) {
            position.row = rowIndex;
            position.column = columnIndex;
          }
        }
      }
    }
    
    const data = new SendData();
    if(block != undefined){
      data.block = block;
    }
    data.event = event;

    this.current_block = new Send_block();
    if(block != undefined){
      this.current_block.name = data.block.label;
    }
    this.current_routine.description = "Description of routine";

    if(block == undefined){ // If block is undefined then it was a previous block
      this.current_block = send_block;
      //console.log("Change position");
    } else { // You are grabbing from the second sidebar
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
    }

    data.event.preventDefault(); // Prevent the default behavior

    this.check_cells_positions();

    let index_row = 0;
    let index_col = 0;

    // Iterate through the coordinates and add unique x values to the Set

    const divide = 10;

    this.reset_edges();

    if(data.event.pageY < this.startRect.top || data.event.pageY > this.endRect.bottom || data.event.pageX < this.startRect.left){
      
      // Drag is Outside of bounds
      if(rearenge){
        this.delete_previous(position, rearenge);
      }

      return false;

    } else if (this.current_block.name == this.current_routine.name){
      // You cant add the current routine to the main routine (or inception)
      return false;

    } else {
      if(this.cellPositions.length == 0){
        this.current_routine.array_block[0] = [this.current_block];
        return true;
      } else { // It has more than 1 block
        let blocks = 0
        for (const num of this.cellPositions) {
          if(num.center_y + num.height/2 > data.event.pageY){
            if(num.center_y - num.height/2 < data.event.pageY){

              // Add to previous row (not new row)
              
              // Routines can't be added in a row with other blocks
              if(this.current_block.class == "routine"){
                this.setOpenRoutine(true)
                break;
              }

              let break_var = 0;
              
              // Check that you can't add 2 blocks from the same class together 
              // or add other blocks to a row with routine
              for(let i = 0; i < this.current_routine.array_block[index_row].length; i++) {
                if((rearenge && (index_row != position.row || i != position.column)) || !rearenge){ // Dont take into account current block if rearanging
                  if(this.current_routine.array_block[index_row][i].class == this.current_block.class 
                    || this.current_routine.array_block[index_row][i].class == "routine"){
                    if(this.current_block.name == "Talk" && this.current_routine.array_block[index_row][i].name == "Talk"){
                      // Talk can be added
                    } else { // Current block cant be added
                      if(this.current_routine.array_block[index_row][i].class == "routine"){
                        this.setOpenRoutine(true)
                      }
                      break_var = 1;
                      break;
                    }
                  }
                }
              }

              if(break_var == 1){
                this.setOpenClass(true);
                break;
              }

              for (const coord of this.cellPositions) { // Calculate where in the row it should be added
                if (coord.center_y == num.center_y){
                  if(coord.center_x > data.event.pageX){
                    break;
                  }
                  index_col++;
                }
              }
              //console.log("First")
              this.current_routine.array_block[index_row].splice(index_col, 0, this.current_block);
              this.delete_previous(position, rearenge, index_row, index_col);
              return true;
            } else {
              //console.log("Second")
              this.current_routine.array_block.splice(index_row, 0, [this.current_block]);
              this.delete_previous(position, rearenge, index_row, index_col);
              return true;
            }
            break;
          }
          if(this.current_routine.array_block.length > index_row){
            blocks += this.current_routine.array_block[index_row].length
          } else {
            blocks += 1
          }
          index_row++;
        }
      }

      // Dropped in new row
      if(data.event.pageY > this.cellPositions[this.cellPositions.length - 1].center_y + this.cellPositions[0].height/2){
        this.current_routine.array_block.push([this.current_block]);
        this.delete_previous(position, rearenge);
        return true;
      }

      return false;
    }
  }

  delete_previous(position:{row:number, column:number}, rearenge?: boolean, index_col?:number, index_row?:number){
    if(rearenge){
      if(index_col != undefined){
        if(position.row >= index_col && this.current_routine.array_block[index_col].length == 1){ // Calculate new position
          position.row += 1
        }
        if (position.column >= index_row && position.row == index_col){
          position.column += 1
        }
      }
      this.current_routine.array_block[position.row].splice(position.column, 1) // Erase position
      if(this.current_routine.array_block[position.row].length == 0){ // If row is now empty erase
        this.current_routine.array_block.splice(position.row, 1);
      }
    } else {
      this.blocks -= 1;
    }
  }

  setOpenClass(isOpen: boolean) {
    this.isToastOpenClass = isOpen;
  }

  setOpenRoutine(isOpen: boolean) {
    this.isToastOpenRoutine = isOpen;
  }
}



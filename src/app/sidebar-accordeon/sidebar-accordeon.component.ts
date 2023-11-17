import { Component, OnInit, OnDestroy, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ScrollService } from '../scroll.service';
import { RestService } from '../rest.service';
import { Body_Gestures, Facial_Expression, Speech, Tone_Voice, Routines_Blocks, Block } from '../models/blocks.model';
import { NewBlockService } from '../new-block.service'
import { PopUpService } from '../pop-up.service';
import { saveAs } from 'file-saver';
// import domtoimage from 'dom-to-image';
import { TabServiceService } from '../tab-service.service';
import { Routines, Send_block } from '../models/routines.model';

@Component({
  selector: 'app-sidebar-accordeon',
  templateUrl: './sidebar-accordeon.component.html',
  styleUrls: ['./sidebar-accordeon.component.scss'],
})
export class SidebarAccordeonComponent implements OnDestroy {
  @Output() agregarTabEvent = new EventEmitter<void>();

  //onModifyClick(): void {
    //this.agregarTabEvent.emit();
  //}

  onModifyClick(): void {
    this.tabService.addTabToContainer(this.pop_over_block);
  }
  // Funcion de doble click 
  onDoubleClick(event: MouseEvent, index: number, item:Block) {
    //console.log('Doble clic en el ítem número ' + index);
    this.tabService.addTabToContainer(item);
  }
  
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('full', { static: false }) full: IonContent;
  @ViewChild('listenerbig', { static: false }) listenerBig: IonAccordionGroup;
  @ViewChild('listenersmall', { static: false }) listenerSmall: IonAccordionGroup;
  @ViewChild('popover') popover;
  
  private scrollSubscription: Subscription;
  
  talk: Speech;
  scroll_position: number;
  
  //Esta parte es para hacer que funcione el scroll en dos componentes 
  constructor(private scrollService: ScrollService, private rs: RestService, 
    private new_block: NewBlockService, private pop_up: PopUpService, 
    private tabService: TabServiceService) {

    this.scrollSubscription = this.scrollService.getScrollObservable().subscribe(({positionX, positionY }) => 
    {
      this.content.scrollToPoint(positionX, positionY, 500); // Realizar el scroll en este componente
    });

    this.talk = new Speech("", "Talk", "Talk block", "A1", "");

    this.new_block.newTab.subscribe((response) =>{
      let incoming_routines: Routines_Blocks[] = [];

      // Call to REST service to fetch all documents from the Routines database
      this.rs.get_routines().subscribe(
        (response) =>{
          // The response is an array that contains arrays that represent the
          // documents from the Routines database
          this.routines = response[0];
          this.routines.forEach(element => {
            const block = new Routines_Blocks(element.id, element.label, element.description);
            block.color = "medium";
            incoming_routines.push(block);
          });

          if(this.routines_blocks.length != incoming_routines.length){
            this.routines_blocks = incoming_routines;
          }
        });        
      });

  }

  ngOnDestroy() {
      this.scrollSubscription.unsubscribe(); // Importante desuscribirse al destruir el componente
  }

  facial_expresions: Facial_Expression[] = [];
  body_gestures: Body_Gestures[] = [];
  tone_of_voice: Tone_Voice[] = [];
  speech: Speech[] = [];
  routines: Routines_Blocks[] = [];

  facial_expresions_blocks: Facial_Expression[] = [];
  body_gestures_blocks: Body_Gestures[] = [];
  tone_of_voice_blocks: Tone_Voice[] = [];
  speech_blocks: Speech[] = [];
  routines_blocks: Routines_Blocks[] = [];

  isOpen = false;
  pop_over_block: Block;

  routine_images: string[] = [];

  only_once = true;

  ngOnInit() {

    // Call to REST service to fetch all documents from both databases
    this.rs.read_db()
    .subscribe(
      (response) => {
        // The response is an array of arrays.
        // Each array corresponds to all the documents fetched from the databases

        // First array corresponds to the facial expressions documents
        this.facial_expresions = response[0];

        this.facial_expresions.forEach(element => {
          const block = new Facial_Expression(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "success";
          this.facial_expresions_blocks.push(block);
        });

        // Second array corresponds to the body gestures documents
        this.body_gestures = response[1];

        this.body_gestures.forEach(element => {
          const block = new Body_Gestures(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "danger";
          this.body_gestures_blocks.push(block);
        });

        // TODO Cambiar nombre a arrays para que haga match con los arrays de python
        // Third array corresponds to the sounds documents
        this.tone_of_voice = response[2];

        this.tone_of_voice.forEach(element => {
          const block = new Tone_Voice(element.id, element.label, element.description, element.id_in_robot);
          block.color = "tertiary";
          this.tone_of_voice_blocks.push(block);
        });
        
        // Fourth array corresponds to the verbal documents
        this.speech = response[3];

        this.speech.forEach(element => {
          const block = new Speech(element.id, element.label, element.description, element.id_in_robot, element.utterance);
          block.color = "warning";
          if(element.label != "Talk"){
            console.log(element.label);
            this.speech_blocks.push(block);
          } else {
            this.talk = block;
          }
        });

        // Fifth array corresponds to the routines documents
        this.routines = response[4];
        this.routines.forEach(element => {
          const block = new Routines_Blocks(element.id, element.label, element.description);
          block.color = "medium";
        });
      },
      (error) => {
        console.log("No Data Found" + error);
      }
    )

    this.generateItems();
  }

  // This function is to create images when accordeon changes

  /*accordionGroupChange(ev: any){
    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );

    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.routines_blocks.length > 0 && this.only_once){
      let i = 0;
      console.log("Start")
      this.routines_blocks.forEach(element => {
        console.log(element);
        var name = "block_"+i;
        console.log(name)
        var node = document.getElementById(name);
        domtoimage.toPng(node)
          .then(function (dataUrl) { 
              this.routine_images.push(dataUrl);
              //console.log(img)
              //document.body.appendChild(img);
          })
          .catch(function (error) {
              console.error('oops, something went wrong!', error);
          });
        i+=1;
      });
      this.only_once = false;
    }
  };*/

  private generateItems() {

  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // Aqui inica las funciones para hacer el Scroll
  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    this.scroll_position = ev.detail.scrollTop
  }

  handleScrollEnd() {
    console.log('scroll end');
  }

  onDragEnd(event: DragEvent, block: Block): void {
    event.preventDefault();
    this.new_block.emitData(event, block);
  }

  isExpanded = false;

  onAccordionChange(event: any) {
    // Toggle the isExpanded variable when the accordion is toggled
    this.isExpanded = !this.isExpanded;
  }

  openLastRoutine(event: any){
    // Call for last routine in the db and push on block-component
    let current_routine = new Routines();
    this.rs.get_recent_routine()
    .subscribe(
      (response) => {
          response[0].forEach(name => {
            current_routine.name = name
          });
          response[1].forEach(element => {
            current_routine.array_block.push([]);
            element.forEach(block_item => {
              let block = new Send_block();
              block.class = block_item.class;
              block.name = block_item.name;
              block.level = block_item.level;
              block.talk = block_item.talk;
              block.clear = block_item.clear;
              current_routine.array_block[current_routine.array_block.length-1].push(block);
            });
          });
          console.log(response); // Missing bring back name of the routine  
      },(error) => {
          console.log("No Data Found" + error);
      }
    )
    console.log("CurrentRoutine", current_routine);
    this.pop_up.push_routine(current_routine);        
  }

  async openPopover(color: string, e:MouseEvent, item: Block) {
    e.preventDefault();
    if (color === 'medium') {
      this.popover.event = e;
      this.isOpen = true;
      this.pop_over_block = item;
    }
  }

  delete_routine(ev: Event){
    // Call to REST service to delete a routine from the Routines database.
    // Pass the routine's name in order to locate it in the database.
    console.log(this.pop_over_block);
    this.rs.delete_routine(this.pop_over_block["id"])
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )

    let i = 0;
    for(let item in this.routines_blocks){
      if(this.routines_blocks[item].label == this.pop_over_block.label){
        this.routines_blocks.splice(i, 1);
      }
      i++;
    }

    this.isOpen = false;

  }

  download_routine(ev: Event){
    // Call to REST service to download the YAML file of a routine from the Routines database.
    // Pass the routine's name in order to locate it in the database.
    this.rs.download_routine(this.pop_over_block["id"])
    .subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'text/yaml' });
        saveAs(blob, this.pop_over_block["label"] + ".yaml");
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
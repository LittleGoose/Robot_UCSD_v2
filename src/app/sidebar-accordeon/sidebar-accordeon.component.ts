import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-sidebar-accordeon',
  templateUrl: './sidebar-accordeon.component.html',
  styleUrls: ['./sidebar-accordeon.component.scss'],
})
export class SidebarAccordeonComponent implements OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('listenerbig', { static: false }) listenerBig: IonAccordionGroup;
  @ViewChild('listenersmall', { static: false }) listenerSmall: IonAccordionGroup;
  @ViewChild('popover') popover;
  private scrollSubscription: Subscription;
  talk: Speech;
  
  //Esta parte es para hacer que funcione el scroll en dos componentes 
  constructor(private scrollService: ScrollService, private rs: RestService, private new_block: NewBlockService, private pop_up: PopUpService) {

    this.scrollSubscription = this.scrollService.getScrollObservable().subscribe(({positionX, positionY }) => 
    {
      this.content.scrollToPoint(positionX, positionY, 500); // Realizar el scroll en este componente
    });

    this.talk = new Speech("", "Talk", "Talk block", "A1", "");

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

  ngOnInit() {

    this.rs.read_db()
    .subscribe(
      (response) => {

        this.facial_expresions = response[0];

        this.facial_expresions.forEach(element => {
          const block = new Facial_Expression(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "success";
          this.facial_expresions_blocks.push(block);
        });

        this.body_gestures = response[1];

        this.body_gestures.forEach(element => {
          const block = new Body_Gestures(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "danger";
          this.body_gestures_blocks.push(block);
        });

        this.tone_of_voice = response[2];

        this.tone_of_voice.forEach(element => {
          const block = new Tone_Voice(element.id, element.label, element.description, element.id_in_robot);
          block.color = "tertiary";
          this.tone_of_voice_blocks.push(block);
        });
        
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

        this.routines = response[4];
        this.routines.forEach(element => {
          const block = new Routines_Blocks(element.id, element.label, element.description);
          block.color = "medium";
          this.routines_blocks.push(block);
        });

      },
      (error) => {
        console.log("No Data Found" + error);
      }
    )

    this.generateItems();

  }

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
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }

  onDragEnd(event: DragEvent, block: Block): void {
    this.new_block.emitData(event, block);
  }

  isExpanded = false;

  onAccordionChange(event: any) {
    // Toggle the isExpanded variable when the accordion is toggled
    this.isExpanded = !this.isExpanded;
  }

  openLastRoutine(){
    console.log("Open Last Routine")
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
    // Delete routine
    console.log("Delete");
    console.log(this.pop_over_block);
    this.rs.delete_routine(this.pop_over_block["label"])
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  download_routine(ev: Event){
    // Download routne
    this.rs.download_routine(this.pop_over_block["label"])
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

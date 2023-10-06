import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonContent , PopoverController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ScrollService } from '../scroll.service';
import { RestService } from '../rest.service';
import { PopUpService } from '../pop-up.service';
import { Body_Gestures, Facial_Expression, Speech, Tone_Voice, Routines_Blocks, Block } from '../models/blocks.model';
import { NewBlockService } from '../new-block.service'

@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss'],
})
export class SidebarSecondComponent implements OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('popover') popover;
  private scrollSubscription: Subscription;
  
  //Esta parte es para hacer que funcione el scroll en dos componentes 
  constructor(private scrollService: ScrollService, private rs: RestService, private new_block: NewBlockService, private pop_up: PopUpService) {
    this.pop_up.saveRoutineEvent.subscribe((data) => {
      if(data.type_def  != "Send_Name_Please"){
        if(!this.options.some(option => option.label === data.routine.label)){
          data.routine.color = "medium"
          this.options.push(data.routine);
        }
      }
    });

    this.scrollSubscription = this.scrollService.getScrollObservable().subscribe(({positionX, positionY }) => 
    {
      this.content.scrollToPoint(positionX, positionY, 500); // Realizar el scroll en este componente
    });
  }

  ngOnDestroy() {
      this.scrollSubscription.unsubscribe(); // Importante desuscribirse al destruir el componente
  }
  
  //rootPage2 = 'Panel2Page';

  // This will be added with the database
  block_1: Facial_Expression = new Facial_Expression("1", "Happy", "Happy face", "E1", 0);
  block_2: Facial_Expression = new Facial_Expression("2", "Sad", "Sad face", "E2", 0);

  block_3: Body_Gestures = new Body_Gestures("1", "Nod", "Rotate head", "B1", 0);
  block_4: Body_Gestures = new Body_Gestures("2", "Turn", "Rotate head", "B2", 0);

  block_5: Tone_Voice = new Tone_Voice("1", "Excited", "Rotate head", "T1");
  block_6: Tone_Voice = new Tone_Voice("2", "Timid", "Rotate head", "T2");

  block_7: Speech = new Speech("1", "Listen", "Rotate head", "T1", "");
  block_8: Speech = new Speech("2", "Talk", "Rotate head", "T2", "");
  block_9: Speech = new Speech("3", "Scream", "Rotate head", "T3", "Hm");

  // block_10: Routines_Blocks = new Routines_Blocks("1", "Dance_1", 1);
  // block_11: Routines_Blocks = new Routines_Blocks("2", "Conversation_1", 2);
 
  facial_expresions: Facial_Expression[] = [];
  body_gestures: Body_Gestures[] = [];
  tone_of_voice: Tone_Voice[] = [];
  speech: Speech[] = [];
  routines: Routines_Blocks[] = [];

  options : Block[] = [];

  isOpen = false;

  ngOnInit() {

    this.rs.read_db()
    .subscribe(
      (response) => {

        this.facial_expresions = response[0];

        this.facial_expresions.forEach(element => {
          const block = new Facial_Expression(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "success";
          this.options.push(block);
        });

        this.body_gestures = response[1];

        this.body_gestures.forEach(element => {
          const block = new Body_Gestures(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "danger";
          this.options.push(block);
        });

        this.tone_of_voice = response[2];

        this.tone_of_voice.forEach(element => {
          const block = new Tone_Voice(element.id, element.label, element.description, element.id_in_robot);
          block.color = "tertiary";
          this.options.push(block);
        });
        
        this.speech = response[3];

        this.speech.forEach(element => {
          const block = new Speech(element.id, element.label, element.description, element.id_in_robot, element.utterance);
          block.color = "warning";
          this.options.push(block);
        });

        this.routines = response[4];
        this.routines.forEach(element => {
          const block = new Routines_Blocks(element.id, element.label, element.description);
          block.color = "medium";
          this.options.push(block);
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

  async openPopover(color: string, e:MouseEvent) {
    e.preventDefault();
    if (color === 'medium' ) {
      this.popover.event = e;
      this.isOpen = true;
    }
  }

}


import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ScrollService } from '../shared.service';
import { RestService } from '../rest.service';
import { Body_Gestures, Facial_Expression, Speech, Tone_Voice, Routines_Blocks, Block } from '../models/blocks.model';
import { NewBlockService } from '../new-block.service'

@Component({
  selector: 'app-sidebar-second',
  templateUrl: './sidebar-second.component.html',
  styleUrls: ['./sidebar-second.component.scss'],
})
export class SidebarSecondComponent  implements OnInit {
  @ViewChild('scrollContent', { static: true }) scrollContent!: IonContent;
  @ViewChild(IonContent) ionContent!: IonContent;


  //Esta parte es para hacer que funcione el scroll en dos componentes 
  constructor(private scrollService: ScrollService, private rs: RestService, private new_block: NewBlockService) {
    this.new_block.saveRoutineEvent.subscribe((data) => {
      if(data.type_def != "Button_Clicked"){
        if(!this.options.some(option => option.label === data.routine.label)){
          data.routine.color = "medium"
          this.options.push(data.routine);
        }
      }
    });
  }

  getScrollPosition(): number {
    return this.scrollService.getScrollPosition();
  }

  //rootPage2 = 'Panel2Page';

  // This will be added with the database
  block_1: Facial_Expression = new Facial_Expression(1, "Happy", "Happy face", "E1", 0);
  block_2: Facial_Expression = new Facial_Expression(2, "Sad", "Sad face", "E2", 0);

  block_3: Body_Gestures = new Body_Gestures(1, "Nod", "Rotate head", "B1", 0);
  block_4: Body_Gestures = new Body_Gestures(2, "Turn", "Rotate head", "B2", 0);

  block_5: Tone_Voice = new Tone_Voice(1, "Excited", "Rotate head", "T1");
  block_6: Tone_Voice = new Tone_Voice(2, "Timid", "Rotate head", "T2");

  block_7: Speech = new Speech(1, "Listen", "Rotate head", "T1", "");
  block_8: Speech = new Speech(2, "Talk", "Rotate head", "T2", "");
  block_9: Speech = new Speech(3, "Scream", "Rotate head", "T3", "Hm");

  block_10: Routines_Blocks = new Routines_Blocks(1, "Dance_1", 1);
  block_11: Routines_Blocks = new Routines_Blocks(2, "Conversation_1", 2);
  
  facial_expresions: Facial_Expression[] = [this.block_1, this.block_2];
  body_gestures: Body_Gestures[] = [this.block_3, this.block_4];
  tone_of_voice: Tone_Voice[] = [this.block_5, this.block_6];
  speech: Speech[] = [this.block_7, this.block_8, this.block_9];
  routines: Routines_Blocks[] = [this.block_10, this.block_11];

  options: Block[] = [];

  facial_list : Facial_Expression[] = [];


  ngOnInit() {
    /*this.rs.read_db()
    .subscribe(
      (response) => {
        this.facial_list = response[0]["data"];
        console.log(this.facial_list);
      },
      (error) => {
        console.log("No Data Found" + error);
      }
    )*/

    this.generateItems();
  }

  private generateItems() {

    let totalexpressions = this.facial_expresions.length;
    for (let i = 0; i < totalexpressions; i++) {
      this.facial_expresions[i].color = "success"
      this.options.push(this.facial_expresions[i]);
    }

    let totalgestures = this.body_gestures.length;
    for (let i = 0; i < totalgestures; i++) {
      this.body_gestures[i].color = "danger"
      this.options.push(this.body_gestures[i]);
    }

    let totalvoices = this.tone_of_voice.length;
    for (let i = 0; i < totalvoices; i++) {
      this.tone_of_voice[i].color = "tertiary"
      this.options.push(this.tone_of_voice[i]);
    }

    let totalspeach = this.speech.length;
    for (let i = 0; i < totalspeach; i++) {
      this.speech[i].color = "warning"
      this.options.push(this.speech[i]);
    }

    let totalroutines = this.routines.length;
    for (let i = 0; i < totalroutines; i++) {
      this.routines[i].color = "medium"
      this.options.push(this.routines[i]);
    }

  }

  onIonInfinite(ev: any) {
    this.generateItems();
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

  }
  

  


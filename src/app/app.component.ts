import { CommonModule } from '@angular/common';
import { Component,  Output, EventEmitter} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, PopoverController, TextValueAccessor } from '@ionic/angular';
import { RoutineAreaModule } from './routine-area/routine-area.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PopUpService } from './pop-up.service';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './rest.service';
import { NewBlockService } from './new-block.service';
import { BlockComponentComponent } from './block-component/block-component.component';
import { PopUpLoadPreviousRoutineComponent } from './pop-up-load-previous-routine/pop-up-load-previous-routine.component';

import { OnInit } from '@angular/core';
import { Block, Facial_Expression, Routines_Blocks } from './models/blocks.model';
import {  ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList,  ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Routines, Send_block } from './models/routines.model';
import { TabData } from './models/tabsdata';
import { TabServiceService } from './tab-service.service';
import {OverlayEventDetail} from '@ionic/core'; 
import * as yaml from '../../node_modules/js-yaml/dist/js-yaml';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, 
    RoutineAreaModule, 
    SidebarModule,
    FormsModule,
    HttpClientModule ],
  providers:[PopUpService, RestService, NewBlockService, BlockComponentComponent ],

})

export class AppComponent implements OnInit {
  @Output() agregarTab: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeTabEvent = new EventEmitter<void>();
  @ViewChild('botonesContainer', { read: ViewContainerRef  }) botonesContainer: ViewContainerRef;

  block_view: boolean = true;
  text: String;
  routine: Routines;
  opened_tab: number = 0;
  routines: Array<Routines> = [];

    // Aqui termina las funciones para hacer el scroll
  constructor(private new_block: NewBlockService, private popUpService: PopUpService, private componentFactoryResolver: ComponentFactoryResolver,
    private popoverController: PopoverController, private rs: RestService, private tabService: TabServiceService) {
      this.popUpService.retrieve_current_routine.subscribe(
        (data) =>{
          // this.current_routine = data;
          // console.log(data);
          this.routine = data;
        });

        this.tabService.tabAdded.subscribe((data) => {
          this.agregarTabAlContainer(data);
        });
    
      console.log("on constructor app");

      this.popUpService.clearRoutine.subscribe((idTabACerrar) => {
      });

      this.popUpService.delete_tab.subscribe((idTabACerrar) => {
        console.log("CERRANDO TAB", idTabACerrar)
        this.tabDataList.splice(idTabACerrar, 1);
        this.routines.splice(idTabACerrar, 1);
        if (this.tabDataList.length === 0)
        {
          this.agregarTabAlContainer();
        }
        this.opened_tab = 0;
        this.popUpService.push_routine(this.routines[0]);
      });

      this.popUpService.store_current_routine.subscribe((routine) => {
        let new_Routine = new Routines(); // Change for opened
        this.routines.push(new_Routine);
        this.popUpService.push_routine(new_Routine); // Change for the incoming routine
        this.routines[this.opened_tab] = routine;
        this.opened_tab = this.routines.length - 1;
        console.log(this.opened_tab);
      });

      this.popUpService.results_ready.subscribe((routine) => {
        this.tabDataList[this.opened_tab].tabName = routine.name;
      })
  }
  
  async ngOnInit() {
    // Abre el popover personalizado tan pronto como la página se inicie
    const popover = await this.popoverController.create({
      component: PopUpLoadPreviousRoutineComponent, // Reemplaza con tu página de popover personalizado
      // Coloca las propiedades de posición y otros ajustes según tus necesidades
    });

    let current_routine: Routines = new Routines();
    // this.popUpService.retrieve_routine("save_routine");

    await popover.present();
    await popover.onDidDismiss()
    .then((detail: OverlayEventDetail) => {
        if(detail.data == "yes"){
          
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
                this.tabDataList[0].tabName = current_routine.name;  
                console.log("Name", this.tabDataList[0].tabName, current_routine.name)
            },(error) => {
                console.log("No Data Found" + error);
            }
          )
          console.log("CurrentRoutine", current_routine);
          this.popUpService.push_routine(current_routine);
          this.routines[0] = current_routine;        
        }
    });

    // Recuperar el valor de mostrarBloque del almacenamiento local
    const mostrarBloqueLocalStorage = localStorage.getItem('mostrarBloque');
    this.mostrarBloque = mostrarBloqueLocalStorage === 'true'; // Convertir a boolean

  }
  
  ngAfterViewInit(){
    //NOTE: Se agrega un tab inmediamente al crear la app
    this.agregarTabAlContainer();
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

  onScroll(event: Event){
    console.log("Scrolled")
    this.new_block.sendScroll(event);
  }

  saveRoutine(){ // Button for save
    this.popUpService.ask_name("ask");
  }

  onNewPressed(){
    this.agregarTabAlContainer();
  }

  mostrarBloque = false;
  id_contador = 0; // Variable para rastrear la cantidad de botones
  tabDataList: TabData[] = [];

  agregarTabAlContainer(item?:Block) {
      //Creando informacion del tab
      var id_actual = this.id_contador;
      var tabId = "tabid_" + id_actual.toString();
      var tabTitle = "";
      if(item){
        tabTitle = item.label;
      } else {
        tabTitle = "New Routine"
      }
      let now = new Date();
      let horaCreacion = `${now.getHours()}` + ":" + `${now.getMinutes()}` + ":" + `${now.getSeconds()}`;
      var dataInfo = "Tab creado a las: " + `${horaCreacion}`; // Puedes establecer la información según tus necesidades
      //nuevoTab.updateTabTitle(buttonLabel);
      //this.tabsComponentList.push(nuevoTab);
      this.crearTab(tabTitle, dataInfo, tabId)
      var lastIndex = this.tabDataList.length - 1;
      //this.tabDataList[lastIndex].tabName=tabTitle);
      this.tabDataList[lastIndex].tabName = tabTitle;
      // Escucha eventos o realiza otras acciones según sea necesario.
      this.mostrarBloque = true ;

      // Incrementa la cantidad de botones

      // Almacena mostrarBloque en el almacenamiento local
      localStorage.setItem('mostrarBloque', 'true');

      this.new_block.newTabClicked();

      this.popUpService.retrieve_routine("get");
      this.popUpService.retrieve_routine("change_tab");
  }


  crearTab(tabName: string, extraInfo: string, tabId: string) {
    //Se crea el boton
    var datosTab = new TabData(tabName, extraInfo, tabId);
    this.tabDataList.push(datosTab);
    //return tab;
  }
  
  Switch_View(){
    // Function that alternates between yaml/block view
    this.popUpService.retrieve_routine("save_routine");
    this.popUpService.retrieve_routine("get");
    this.block_view = !this.block_view;

    this.rs.get_routine_text_preview()
        .subscribe(
          (response) => {
            if(document.getElementById("myText")){
              let display_data = {} as any;
    
              for(let i=0; i< this.routine.array_block.length; i++){
                let Segment = "Segment" + i;
                display_data[Segment] = this.routine.array_block[i];
              }
    
              document.getElementById("myText").innerHTML = yaml.dump(display_data);;
            }
          },
          (error) => {
            console.log(error);
          }
        )  
  } 

  eliminarBoton(idTabACerrar: number) {
    console.log("tab clickeado")
    this.popUpService.openModal_Clear("", idTabACerrar);
    console.log("cerrando tab, data: " + `${idTabACerrar}`)
  }

  tabClicked(event: Event, i:number){
    this.opened_tab = i;
    this.popUpService.push_routine(this.routines[i]);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, PopoverController } from '@ionic/angular';
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
import { Facial_Expression, Routines_Blocks } from './models/blocks.model';
import { TabsComponent } from './tabs/tabs.component';
import {  ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList,  ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Routines, Send_block } from './models/routines.model';
import { TabData } from './models/tabsdata';
import {OverlayEventDetail} from '@ionic/core'; 

import * as yaml from 'js-yaml';

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
  @ViewChild('botonesContainer', { read: ViewContainerRef  }) botonesContainer: ViewContainerRef;

  block_view: boolean = true;
  text: String;
  routine: Routines;

    // Aqui termina las funciones para hacer el scroll
  constructor(private new_block: NewBlockService, private popUpService: PopUpService, private componentFactoryResolver: ComponentFactoryResolver,
    private popoverController: PopoverController, private rs: RestService) {
      this.popUpService.retrieve_current_routine.subscribe(
        (data) =>{
          // this.current_routine = data;
          // console.log(data);
          this.routine = data;
        })
  }
  //rootPage2 = 'Panel2Page';
  
  async ngOnInit() {
    // Recuperar el valor de mostrarBloque del almacenamiento local
    const mostrarBloqueLocalStorage = localStorage.getItem('mostrarBloque');
    this.mostrarBloque = mostrarBloqueLocalStorage === 'true'; // Convertir a boolean

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
                response.forEach(element => {
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
            },(error) => {
                console.log("No Data Found" + error);
            }
          )
          
          this.popUpService.push_routine(current_routine);
          
          //this.check_cells_positions();
        }
    });
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

  saveRoutine(){
    this.popUpService.ask_name("ask");
  }

  clearRoutine(){
    this.popUpService.openModal_Clear();
  }


  mostrarBloque = false;
  buttons: { label: string }[] = []; // Arreglo para almacenar los botones
  id_contador = 0; // Variable para rastrear la cantidad de botones
  tabDataList: TabData[] = [];
  tabsComponentList: TabsComponent[] = [];


  agregarTabAlContainer() {
      //Creando informacion del tab
      const id_actual = this.id_contador;
      const buttonLabel = `Tab ${id_actual}`;
      const dataInfo = "Alguna información aquí" + '${id}'; // Puedes establecer la información según tus necesidades
     
      
      
      const nuevoTab = this.crearTab()
      this.tabsComponentList.push(nuevoTab)
      
      nuevoTab.removeTabEvent.subscribe(() => {
        this.cerrarTab(nuevoTab);
      });
      
      // Escucha eventos o realiza otras acciones según sea necesario.
      this.mostrarBloque = true ;
      this.buttons.push({ label: buttonLabel });
      console.log( this.buttons)

      // Incrementa la cantidad de botones
      this.id_contador++;

      // Almacena mostrarBloque en el almacenamiento local
      localStorage.setItem('mostrarBloque', 'true');

      this.new_block.newTabClicked();
  }


  crearTab() {
    //Se crea el boton
    const buttonComponent = TabsComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(buttonComponent);
    const componentRef = componentFactory.create(this.botonesContainer.parentInjector);
    // Agrega el botón al contenedor.
    this.botonesContainer.insert(componentRef.hostView);
    const tab = componentRef.instance as TabsComponent;
    //Guardando datos para acceder a ellos despues
    const datosTab = new TabData(componentRef.hostView, tab);
    this.tabDataList.push(datosTab);

    return tab;
  }

  cerrarTab(tabComponent: TabsComponent) {
    // Maneja el cierre del componente personalizado
    //console.log(this.botonesContainer.)
    const msg = "cerrando tab desde el padre, con un total" + 
                this.tabsComponentList.length.toString() + " elemtos"
    console.log(msg)
    const index = this.tabsComponentList.indexOf(tabComponent);
    if (index !== -1) {
      this.tabsComponentList.splice(index, 1);
      // También puedes destruir el componente si es necesario.
    }
    else
    {
      console.log("tab no encontrado")
    }

    const size = this.tabDataList.length;
    let i =0;
    let tabEncontrado = false;
    while(i < size && !tabEncontrado) //tabEncontrado == false, if(!tabEncontrado)
    {
        //Si el tab existe en la lista de tabDataList
        if (this.tabDataList[i].tabComponent === tabComponent)
        {
          const hostView = this.tabDataList[i].hostView;
          const indexHost = this.botonesContainer.indexOf(hostView);
          if (indexHost !== -1){
            this.botonesContainer.remove(indexHost) //NO BORRAR 
            tabEncontrado = true;
          }
        }
        i++;
    }

    if (tabEncontrado){
      this.tabDataList.splice(i,1);
    }
  }
  
  Switch_View(){
    this.popUpService.retrieve_routine("save_routine");
    this.popUpService.retrieve_routine("get");    
    this.block_view = !this.block_view;
    console.log(this.routine.array_block);

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
}

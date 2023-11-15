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
import { Facial_Expression, Routines_Blocks } from './models/blocks.model';
import { TabsComponent } from './tabs/tabs.component';
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
  @ViewChild('botonesContainer', { read: ViewContainerRef  }) botonesContainer: ViewContainerRef;

  block_view: boolean = true;
  text: String;
  routine: Routines;

    // Aqui termina las funciones para hacer el scroll
  constructor(private new_block: NewBlockService, private popUpService: PopUpService, private componentFactoryResolver: ComponentFactoryResolver,
    private popoverController: PopoverController, private rs: RestService, private tabService: TabServiceService) {
      this.popUpService.retrieve_current_routine.subscribe(
        (data) =>{
          // this.current_routine = data;
          // console.log(data);
          this.routine = data;
        });

        this.tabService.tabAdded.subscribe(() => {
          this.agregarTabAlContainer();
        });
    
      console.log("on constructor app");

      this.popUpService.clearRoutine.subscribe((idTabACerrar) => {
        console.log("cerrando tab, data: " + `${idTabACerrar}`)
        //var totalTabs = this.tabDataList.length;

        for(let index = 0; index < this.tabDataList.length; index++)
        {
          //var tabActual = this.tabDataList[index];
          if (this.tabDataList[index].tabId == idTabACerrar)
          {
              this.cerrarTab(this.tabDataList[index].tabComponent);
              break;
          }
        }
        if (this.tabDataList.length === 0)
        {
          this.agregarTabAlContainer();
        }
      });
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

  saveRoutine(){
    this.popUpService.ask_name("ask");
  }

  onNewPressed(){
    this.agregarTabAlContainer();
  }

  mostrarBloque = false;
  id_contador = 0; // Variable para rastrear la cantidad de botones
  tabDataList: TabData[] = [];
  tabsComponentList: TabsComponent[] = [];


  agregarTabAlContainer() {
      //Creando informacion del tab
      var id_actual = this.id_contador;
      var tabId = "tabid_" + id_actual.toString();
      var tabTitle = "New Routine";
      let now = new Date();
      let horaCreacion = `${now.getHours()}` + ":" + `${now.getMinutes()}` + ":" + `${now.getSeconds()}`;
      var dataInfo = "Tab creado a las: " + `${horaCreacion}`; // Puedes establecer la información según tus necesidades
          
      var nuevoTab = this.crearTab(tabTitle, dataInfo, tabId);
      //nuevoTab.updateTabTitle(buttonLabel);
      this.tabsComponentList.push(nuevoTab);
      var lastIndex = this.tabsComponentList.length - 1;
      this.tabsComponentList[lastIndex].updateTabTitle(tabTitle);
      nuevoTab.removeTabEvent.subscribe(() => {
        //FIXME: Primero esperar a que el usuario responda "YES" para luego cerrar el tab
        this.popUpService.openModal_Clear(tabId);  
        //this.cerrarTab(nuevoTab);
      });
      
      // Escucha eventos o realiza otras acciones según sea necesario.
      this.mostrarBloque = true ;

      // Incrementa la cantidad de botones
      this.id_contador++;

      // Almacena mostrarBloque en el almacenamiento local
      localStorage.setItem('mostrarBloque', 'true');

      this.new_block.newTabClicked();
  }


  crearTab(tabName: string, extraInfo: string, tabId: string) {
    //Se crea el boton
    var buttonComponent = TabsComponent;
    var componentFactory = this.componentFactoryResolver.resolveComponentFactory(buttonComponent);
    var componentRef = componentFactory.create(this.botonesContainer.parentInjector);
    // Agrega el botón al contenedor.
    this.botonesContainer.insert(componentRef.hostView);
    var tab = componentRef.instance as TabsComponent;
    //Guardando datos para acceder a ellos despues
    var datosTab = new TabData(componentRef.hostView, tab, tabName, extraInfo, tabId);
    this.tabDataList.push(datosTab);
    return tab;
  }

  cerrarTab(tabComponent: TabsComponent) {
    // Maneja el cierre del componente personalizado    
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
    let positon =0;
    let tabEncontrado = false;
    while(positon < size && !tabEncontrado) //tabEncontrado == false, if(!tabEncontrado)
    {
        //Si el tab existe en la lista de tabDataList
        if (this.tabDataList[positon].tabComponent === tabComponent)
        {
          console.log("Tab a borrar -> ID(" + `${this.tabDataList[positon].tabId}` + "), nombre("+ `${this.tabDataList[positon].tabName}` + ")");
          const hostView = this.tabDataList[positon].hostView;
          const indexHost = this.botonesContainer.indexOf(hostView);
          if (indexHost !== -1){
            this.botonesContainer.remove(indexHost) //NO BORRAR 
            tabEncontrado = true;
          }
        }
        if(!tabEncontrado)
          positon++;
    }

    if (tabEncontrado){
      this.tabDataList.splice(positon, 1);
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

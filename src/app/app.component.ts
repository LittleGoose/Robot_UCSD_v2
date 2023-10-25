import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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

import { OnInit } from '@angular/core';
import { Facial_Expression } from './models/blocks.model';
import { TabsComponent } from './tabs/tabs.component';
import {  ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList,  ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Routines, Send_block } from './models/routines.model';
import { TabData } from './models/tabsdata';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, 
    RoutineAreaModule, 
    SidebarModule,
    FormsModule,
    HttpClientModule, ],
  providers:[PopUpService, RestService, NewBlockService, BlockComponentComponent ],

})

export class AppComponent implements OnInit {
  @ViewChild('botonesContainer', { read: ViewContainerRef  }) botonesContainer: ViewContainerRef;

    // Aqui termina las funciones para hacer el scroll
  constructor(private new_block: NewBlockService, private popUpService: PopUpService, private componentFactoryResolver: ComponentFactoryResolver) {

  }
  //rootPage2 = 'Panel2Page';
  
  ngOnInit() {
    // Recuperar el valor de mostrarBloque del almacenamiento local
    const mostrarBloqueLocalStorage = localStorage.getItem('mostrarBloque');
    this.mostrarBloque = mostrarBloqueLocalStorage === 'true'; // Convertir a boolean
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
  

  
 
}

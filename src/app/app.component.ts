import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RoutineAreaModule } from './routine-area/routine-area.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { PopUpService } from './pop-up.service';


import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, 
    RoutineAreaModule, 
    SidebarModule,
    FormsModule],
  providers:[PopUpService],
})

export class AppComponent implements OnInit {
  
  rootPage2 = 'Panel2Page';

  ngOnInit() {
    
  }

  // Aqui termina las funciones para hacer el scroll
  constructor() {}
  
}

import { Component, OnInit } from '@angular/core';
import(ButtonService) from './button.service';

@Component({
  selector: 'app-botton-clear',
  templateUrl: './botton-clear.component.html',
  styleUrls: ['./botton-clear.component.scss'],
})
export class BottonClearComponent  implements OnInit {


  constructor(private ButtonService: ButtonService) { }

  someFunction(){
    this.ButtonService.clearButtons();
  }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-facial-expression',
  templateUrl: './facial-expression.component.html',
  styleUrls: ['./facial-expression.component.scss'], 
  standalone: true,
  imports:[IonicModule],
  
})
export class FacialExpressionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

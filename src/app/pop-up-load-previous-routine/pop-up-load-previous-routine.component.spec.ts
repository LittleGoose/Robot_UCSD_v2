import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpLoadPreviousRoutineComponent } from './pop-up-load-previous-routine.component';

describe('PopUpLoadPreviousRoutineComponent', () => {
  let component: PopUpLoadPreviousRoutineComponent;
  let fixture: ComponentFixture<PopUpLoadPreviousRoutineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpLoadPreviousRoutineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpLoadPreviousRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

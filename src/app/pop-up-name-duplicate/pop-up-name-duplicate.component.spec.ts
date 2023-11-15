import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpNameDuplicateComponent } from './pop-up-name-duplicate.component';

describe('PopUpNameDuplicateComponent', () => {
  let component: PopUpNameDuplicateComponent;
  let fixture: ComponentFixture<PopUpNameDuplicateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpNameDuplicateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpNameDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

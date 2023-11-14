import { TabsComponent } from './../tabs/tabs.component';
import { ViewRef } from "@angular/core";

export class TabData {
    tabName: string;
    dataInfo: string;
    hostView: ViewRef;
    tabComponent: TabsComponent;
    tabId: string;
  
    constructor(host: ViewRef, tab: TabsComponent, tabName: string = "tab name", 
                dataInfo: string = "dummy data", id: string = "idDummy") {
      this.tabName = tabName;
      this.dataInfo = dataInfo;
      this.hostView = host;
      this.tabComponent = tab;
      this.tabId = id;
    }
}